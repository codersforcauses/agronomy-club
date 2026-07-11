#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${1:-${ROOT_DIR}/.env}"

read_env_value() {
  local key="$1"
  local line

  line="$(grep -E "^${key}=" "${ENV_FILE}" | tail -n 1 || true)"
  if [[ -n "${line}" ]]; then
    printf '%s' "${line#*=}"
  fi
}

upsert_env_value() {
  local key="$1"
  local value="$2"

  if grep -q -E "^${key}=" "${ENV_FILE}"; then
    sed -i "s|^${key}=.*$|${key}=${value}|" "${ENV_FILE}"
  else
    printf '%s=%s\n' "${key}" "${value}" >>"${ENV_FILE}"
  fi
}

keycloak_http_port="$(read_env_value KEYCLOAK_HTTP_PORT)"
keycloak_base_url="$(read_env_value KEYCLOAK_BASE_URL)"
keycloak_admin_realm="$(read_env_value KEYCLOAK_ADMIN_REALM)"
keycloak_admin_client_id="$(read_env_value KEYCLOAK_ADMIN_CLIENT_ID)"
keycloak_admin_client_secret="$(read_env_value KEYCLOAK_ADMIN_CLIENT_SECRET)"
keycloak_admin_username="$(read_env_value KEYCLOAK_ADMIN_USERNAME)"
keycloak_admin_password_current="$(read_env_value KEYCLOAK_ADMIN_PASSWORD)"
keycloak_admin_password_target="$(read_env_value FIRST_PLATFORM_ADMIN_PASSWORD)"
first_keycloak_admin_username="$(read_env_value FIRST_KEYCLOAK_ADMIN_USERNAME)"
first_platform_admin_username="$(read_env_value FIRST_PLATFORM_ADMIN_USERNAME)"

if [[ -z "${keycloak_http_port}" ]]; then
  keycloak_http_port="8080"
fi
if [[ -z "${keycloak_base_url}" ]]; then
  keycloak_base_url="http://localhost:${keycloak_http_port}"
fi
if [[ -z "${keycloak_admin_realm}" ]]; then
  keycloak_admin_realm="master"
fi
if [[ -z "${keycloak_admin_client_id}" ]]; then
  keycloak_admin_client_id="admin-cli"
fi
if [[ -z "${keycloak_admin_username}" ]]; then
  keycloak_admin_username="${first_platform_admin_username}"
fi
if [[ -z "${keycloak_admin_username}" ]]; then
  keycloak_admin_username="${first_keycloak_admin_username}"
fi

if [[ -z "${keycloak_admin_username}" ]]; then
  echo "Missing KEYCLOAK_ADMIN_USERNAME or FIRST_KEYCLOAK_ADMIN_USERNAME in ${ENV_FILE}" >&2
  exit 1
fi

if [[ -z "${keycloak_admin_password_current}" ]]; then
  echo "Missing KEYCLOAK_ADMIN_PASSWORD in ${ENV_FILE}" >&2
  exit 1
fi

if [[ -z "${keycloak_admin_password_target}" ]]; then
  keycloak_admin_password_target="$(read_env_value FIRST_KEYCLOAK_ADMIN_PASSWORD)"
fi
if [[ -z "${keycloak_admin_password_target}" ]]; then
  echo "Missing FIRST_KEYCLOAK_ADMIN_PASSWORD in ${ENV_FILE}" >&2
  exit 1
fi

if [[ "${keycloak_admin_password_current}" == "${keycloak_admin_password_target}" ]]; then
  echo "Keycloak admin password already matches FIRST_KEYCLOAK_ADMIN_PASSWORD"
  exit 0
fi

for _ in {1..30}; do
  if curl -fsS "${keycloak_base_url}/health/ready" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

get_admin_token() {
  local password="$1"

  curl -fsS -X POST "${keycloak_base_url}/realms/${keycloak_admin_realm}/protocol/openid-connect/token" \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode "client_id=${keycloak_admin_client_id}" \
    --data-urlencode "username=${keycloak_admin_username}" \
    --data-urlencode "password=${password}" \
    --data-urlencode 'grant_type=password' \
    ${keycloak_admin_client_secret:+--data-urlencode "client_secret=${keycloak_admin_client_secret}"} \
    | jq -r '.access_token // empty'
}

access_token="$(get_admin_token "${keycloak_admin_password_current}" || true)"
if [[ -z "${access_token}" ]]; then
  echo "Unable to authenticate to Keycloak with KEYCLOAK_ADMIN_PASSWORD; cannot rotate admin password" >&2
  exit 1
fi

admin_user_id="$(curl -fsS -G \
  -H "Authorization: Bearer ${access_token}" \
  --data-urlencode "username=${keycloak_admin_username}" \
  --data-urlencode 'exact=true' \
  "${keycloak_base_url}/admin/realms/${keycloak_admin_realm}/users" | jq -r '.[0].id // empty')"

if [[ -z "${admin_user_id}" ]]; then
  echo "Unable to find Keycloak admin user '${keycloak_admin_username}' in realm '${keycloak_admin_realm}'" >&2
  exit 1
fi

reset_payload="$(jq -n --arg password "${keycloak_admin_password_target}" '{type: "password", value: $password, temporary: false}')"

curl -fsS -X PUT \
  -H "Authorization: Bearer ${access_token}" \
  -H 'Content-Type: application/json' \
  -d "${reset_payload}" \
  "${keycloak_base_url}/admin/realms/${keycloak_admin_realm}/users/${admin_user_id}/reset-password" >/dev/null

# Verify new password works before writing back to env.
new_token="$(get_admin_token "${keycloak_admin_password_target}" || true)"
if [[ -z "${new_token}" ]]; then
  echo "Password reset call succeeded but verification with FIRST_KEYCLOAK_ADMIN_PASSWORD failed" >&2
  exit 1
fi

upsert_env_value KEYCLOAK_ADMIN_PASSWORD "${keycloak_admin_password_target}"
upsert_env_value KC_BOOTSTRAP_ADMIN_PASSWORD "${keycloak_admin_password_target}"
upsert_env_value FIRST_PLATFORM_ADMIN_PASSWORD "${keycloak_admin_password_target}"
upsert_env_value FIRST_KEYCLOAK_ADMIN_PASSWORD "${keycloak_admin_password_target}"

echo "Synced live Keycloak admin password to FIRST_KEYCLOAK_ADMIN_PASSWORD"
