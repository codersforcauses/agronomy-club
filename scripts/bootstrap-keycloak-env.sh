#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${1:-${ROOT_DIR}/.env}"

if [[ ! -f "${ENV_FILE}" ]]; then
  touch "${ENV_FILE}"
fi

read_env_value() {
  local key="$1"
  local line

  if [[ -n "${!key:-}" ]]; then
    printf '%s' "${!key}"
    return 0
  fi

  line="$(grep -E "^${key}=" "${ENV_FILE}" | tail -n 1 || true)"
  if [[ -n "${line}" ]]; then
    printf '%s' "${line#*=}"
  fi
}

read_fallback_env_value() {
  local key="$1"
  local fallback_file="$2"
  local line

  if [[ ! -f "${fallback_file}" ]]; then
    return 0
  fi

  line="$(grep -E "^${key}=" "${fallback_file}" | tail -n 1 || true)"
  if [[ -n "${line}" ]]; then
    printf '%s' "${line#*=}"
  fi
}

generate_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 24
  else
    tr -dc 'A-Za-z0-9' </dev/urandom | head -c 48
  fi
}

append_if_missing() {
  local key="$1"
  local value="$2"
  local current

  current="$(read_env_value "${key}")"
  if [[ -n "${current}" ]]; then
    return 0
  fi

  printf '%s=%s\n' "${key}" "${value}" >>"${ENV_FILE}"
  echo "Added ${key} to ${ENV_FILE}"
}

upsert_env_value() {
  local key="$1"
  local value="$2"

  if grep -q -E "^${key}=" "${ENV_FILE}"; then
    sed -i "s|^${key}=.*$|${key}=${value}|" "${ENV_FILE}"
  else
    printf '%s=%s\n' "${key}" "${value}" >>"${ENV_FILE}"
    echo "Added ${key} to ${ENV_FILE}"
  fi
}

postgres_name="$(read_env_value POSTGRES_NAME)"
postgres_user="$(read_env_value POSTGRES_USER)"
postgres_password="$(read_env_value POSTGRES_PASSWORD)"

first_keycloak_admin_username="$(read_env_value FIRST_KEYCLOAK_ADMIN_USERNAME)"
first_keycloak_admin_password="$(read_env_value FIRST_KEYCLOAK_ADMIN_PASSWORD)"
first_django_admin_username="$(read_env_value FIRST_DJANGO_ADMIN_USERNAME)"
first_django_admin_email="$(read_env_value FIRST_DJANGO_ADMIN_EMAIL)"
first_django_admin_password="$(read_env_value FIRST_DJANGO_ADMIN_PASSWORD)"
first_platform_admin_username="$(read_env_value FIRST_PLATFORM_ADMIN_USERNAME)"
first_platform_admin_email="$(read_env_value FIRST_PLATFORM_ADMIN_EMAIL)"
first_platform_admin_password="$(read_env_value FIRST_PLATFORM_ADMIN_PASSWORD)"

if [[ -z "${first_platform_admin_username}" ]]; then
  first_platform_admin_username="${first_keycloak_admin_username}"
fi
if [[ -z "${first_platform_admin_username}" ]]; then
  first_platform_admin_username="${first_django_admin_username}"
fi
if [[ -z "${first_platform_admin_username}" ]]; then
  first_platform_admin_username="admin"
fi

if [[ -z "${first_platform_admin_email}" ]]; then
  first_platform_admin_email="${first_django_admin_email}"
fi
if [[ -z "${first_platform_admin_email}" ]]; then
  first_platform_admin_email="admin@example.com"
fi

if [[ -z "${first_platform_admin_password}" ]]; then
  first_platform_admin_password="${first_keycloak_admin_password}"
fi
if [[ -z "${first_platform_admin_password}" ]]; then
  first_platform_admin_password="${first_django_admin_password}"
fi
if [[ -z "${first_platform_admin_password}" ]]; then
  first_platform_admin_password="ChangeMePlatformAdmin#2026"
fi

if [[ -z "${first_keycloak_admin_username}" ]]; then
  first_keycloak_admin_username="${first_platform_admin_username}"
fi
if [[ -z "${first_keycloak_admin_password}" ]]; then
  first_keycloak_admin_password="${first_platform_admin_password}"
fi
if [[ -z "${first_django_admin_username}" ]]; then
  first_django_admin_username="${first_platform_admin_username}"
fi
if [[ -z "${first_django_admin_email}" ]]; then
  first_django_admin_email="${first_platform_admin_email}"
fi
if [[ -z "${first_django_admin_password}" ]]; then
  first_django_admin_password="${first_platform_admin_password}"
fi

fallback_env_file="${ROOT_DIR}/server/.env"
if [[ "${ENV_FILE}" == *".env.prod" ]]; then
  fallback_env_file="${ROOT_DIR}/.env.prod"
fi

if [[ -z "${postgres_name}" ]]; then
  postgres_name="$(read_fallback_env_value POSTGRES_NAME "${fallback_env_file}")"
fi
if [[ -z "${postgres_name}" ]]; then
  postgres_name="postgres"
fi

if [[ -z "${postgres_user}" ]]; then
  postgres_user="$(read_fallback_env_value POSTGRES_USER "${fallback_env_file}")"
fi
if [[ -z "${postgres_user}" ]]; then
  postgres_user="postgres"
fi

if [[ -z "${postgres_password}" ]]; then
  postgres_password="$(read_fallback_env_value POSTGRES_PASSWORD "${fallback_env_file}")"
fi
if [[ -z "${postgres_password}" ]]; then
  postgres_password="password"
fi

keycloak_http_port="$(read_env_value KEYCLOAK_HTTP_PORT)"
if [[ -z "${keycloak_http_port}" ]]; then
  keycloak_http_port="8080"
fi

realm_name="$(read_env_value KEYCLOAK_REALM)"
if [[ -z "${realm_name}" ]]; then
  realm_name="agronomy-club"
fi

keycloak_base_url="$(read_env_value KEYCLOAK_BASE_URL)"
if [[ -z "${keycloak_base_url}" ]]; then
  keycloak_base_url="http://localhost:${keycloak_http_port}"
fi

keycloak_db_url="$(read_env_value KC_DB_URL)"
if [[ -z "${keycloak_db_url}" ]]; then
  keycloak_db_url="jdbc:postgresql://db:5432/${postgres_name}"
fi

append_if_missing APP_ENV DEVELOPMENT
append_if_missing APP_NAME DjangoAPI
append_if_missing API_SECRET_KEY "$(generate_secret)"
append_if_missing API_ALLOWED_HOSTS ".localhost 127.0.0.1 [::1]"
append_if_missing POSTGRES_HOST db
append_if_missing POSTGRES_NAME "${postgres_name}"
append_if_missing POSTGRES_USER "${postgres_user}"
append_if_missing POSTGRES_PASSWORD "${postgres_password}"
append_if_missing POSTGRES_PORT 5432
append_if_missing DJANGO_SUPERUSER_USERNAME "${first_django_admin_username}"
append_if_missing DJANGO_SUPERUSER_EMAIL "${first_django_admin_email}"
append_if_missing DJANGO_SUPERUSER_PASSWORD "${first_django_admin_password}"
append_if_missing FIRST_PLATFORM_ADMIN_USERNAME "${first_platform_admin_username}"
append_if_missing FIRST_PLATFORM_ADMIN_EMAIL "${first_platform_admin_email}"
append_if_missing FIRST_PLATFORM_ADMIN_PASSWORD "${first_platform_admin_password}"
append_if_missing FIRST_DJANGO_ADMIN_USERNAME "${first_django_admin_username}"
append_if_missing FIRST_DJANGO_ADMIN_EMAIL "${first_django_admin_email}"
append_if_missing FIRST_DJANGO_ADMIN_PASSWORD "${first_django_admin_password}"
append_if_missing FRONTEND_URL "http://localhost:3000"
append_if_missing NEXT_PUBLIC_BACKEND_URL "http://localhost:8081/api"
append_if_missing KEYCLOAK_HTTP_PORT "${keycloak_http_port}"
append_if_missing KEYCLOAK_MANAGEMENT_PORT 9000
append_if_missing KEYCLOAK_IMPORT_REALM_ON_STARTUP true

append_if_missing FIRST_KEYCLOAK_ADMIN_USERNAME "${first_keycloak_admin_username}"
append_if_missing FIRST_KEYCLOAK_ADMIN_PASSWORD "${first_keycloak_admin_password}"
append_if_missing KC_BOOTSTRAP_ADMIN_USERNAME "${first_keycloak_admin_username}"
append_if_missing KC_BOOTSTRAP_ADMIN_PASSWORD "${first_keycloak_admin_password}"
append_if_missing KC_DB postgres
append_if_missing KC_DB_URL "${keycloak_db_url}"
append_if_missing KC_DB_USERNAME "${postgres_user}"
append_if_missing KC_DB_PASSWORD "${postgres_password}"
append_if_missing KC_HOSTNAME localhost
append_if_missing KC_HTTP_ENABLED true
append_if_missing KC_PROXY_HEADERS xforwarded
append_if_missing KC_HEALTH_ENABLED true
append_if_missing KC_METRICS_ENABLED true

bootstrap_admin_username="$(read_env_value KC_BOOTSTRAP_ADMIN_USERNAME)"
bootstrap_admin_password="$(read_env_value KC_BOOTSTRAP_ADMIN_PASSWORD)"
if [[ -z "${bootstrap_admin_username}" ]]; then
  bootstrap_admin_username="admin"
fi
if [[ -z "${bootstrap_admin_password}" ]]; then
  bootstrap_admin_password="$(generate_secret)"
fi

append_if_missing KEYCLOAK_BASE_URL "${keycloak_base_url}"
append_if_missing KEYCLOAK_REALM "${realm_name}"
append_if_missing KEYCLOAK_ISSUER "${keycloak_base_url}/realms/${realm_name}"
append_if_missing KEYCLOAK_JWKS_URL "${keycloak_base_url}/realms/${realm_name}/protocol/openid-connect/certs"
append_if_missing KEYCLOAK_AUTH_URL "${keycloak_base_url}/realms/${realm_name}/protocol/openid-connect/auth"
append_if_missing KEYCLOAK_TOKEN_URL "${keycloak_base_url}/realms/${realm_name}/protocol/openid-connect/token"
append_if_missing KEYCLOAK_USERINFO_URL "${keycloak_base_url}/realms/${realm_name}/protocol/openid-connect/userinfo"

append_if_missing DJANGO_OIDC_CLIENT_ID django-admin
append_if_missing DJANGO_OIDC_CLIENT_SECRET "$(generate_secret)"
append_if_missing KEYCLOAK_SYNC_EFFECTIVE_ROLES true
append_if_missing KEYCLOAK_ADMIN_REALM master
append_if_missing KEYCLOAK_ADMIN_CLIENT_ID admin-cli
append_if_missing KEYCLOAK_ADMIN_CLIENT_SECRET ""
append_if_missing KEYCLOAK_ADMIN_USERNAME "${bootstrap_admin_username}"
append_if_missing KEYCLOAK_ADMIN_PASSWORD "${bootstrap_admin_password}"
append_if_missing KEYCLOAK_TEST_ADMIN_EMAIL "${first_django_admin_email}"
append_if_missing KEYCLOAK_TEST_ADMIN_USERNAME "${first_django_admin_username}"
append_if_missing KEYCLOAK_TEST_ADMIN_PASSWORD "${first_django_admin_password}"
append_if_missing NEXT_PUBLIC_KEYCLOAK_URL "${keycloak_base_url}"
append_if_missing NEXT_PUBLIC_KEYCLOAK_REALM "${realm_name}"
append_if_missing NEXT_PUBLIC_KEYCLOAK_CLIENT_ID agronomy-web

append_if_missing AUTH_SOURCE keycloak
append_if_missing ENABLE_LOCAL_ADMIN_FALLBACK true

# Use FIRST_PLATFORM_ADMIN_* as the single source of truth for first-login identity.
upsert_env_value FIRST_DJANGO_ADMIN_USERNAME "${first_platform_admin_username}"
upsert_env_value FIRST_DJANGO_ADMIN_EMAIL "${first_platform_admin_email}"
upsert_env_value FIRST_DJANGO_ADMIN_PASSWORD "${first_platform_admin_password}"
upsert_env_value FIRST_KEYCLOAK_ADMIN_USERNAME "${first_platform_admin_username}"
upsert_env_value FIRST_KEYCLOAK_ADMIN_PASSWORD "${first_platform_admin_password}"

upsert_env_value DJANGO_SUPERUSER_USERNAME "${first_platform_admin_username}"
upsert_env_value DJANGO_SUPERUSER_EMAIL "${first_platform_admin_email}"
upsert_env_value DJANGO_SUPERUSER_PASSWORD "${first_platform_admin_password}"

upsert_env_value KC_BOOTSTRAP_ADMIN_USERNAME "${first_platform_admin_username}"
upsert_env_value KC_BOOTSTRAP_ADMIN_PASSWORD "${first_platform_admin_password}"
upsert_env_value KEYCLOAK_ADMIN_USERNAME "${first_platform_admin_username}"
upsert_env_value KEYCLOAK_ADMIN_PASSWORD "${first_platform_admin_password}"

upsert_env_value KEYCLOAK_TEST_ADMIN_USERNAME "${first_platform_admin_username}"
upsert_env_value KEYCLOAK_TEST_ADMIN_EMAIL "${first_platform_admin_email}"
upsert_env_value KEYCLOAK_TEST_ADMIN_PASSWORD "${first_platform_admin_password}"

echo "Keycloak environment bootstrap complete (${ENV_FILE})."
