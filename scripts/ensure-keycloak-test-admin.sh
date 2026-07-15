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
KEYCLOAK_BASE_URL="$(read_env_value KEYCLOAK_BASE_URL)"
KEYCLOAK_REALM="$(read_env_value KEYCLOAK_REALM)"
KEYCLOAK_ADMIN_REALM="$(read_env_value KEYCLOAK_ADMIN_REALM)"
KEYCLOAK_ADMIN_CLIENT_ID="$(read_env_value KEYCLOAK_ADMIN_CLIENT_ID)"
KEYCLOAK_ADMIN_CLIENT_SECRET="$(read_env_value KEYCLOAK_ADMIN_CLIENT_SECRET)"
KEYCLOAK_ADMIN_USERNAME="$(read_env_value KEYCLOAK_ADMIN_USERNAME)"
KEYCLOAK_ADMIN_PASSWORD="$(read_env_value KEYCLOAK_ADMIN_PASSWORD)"

if [[ -z "${keycloak_http_port}" ]]; then
	keycloak_http_port="8080"
fi
if [[ -z "${KEYCLOAK_BASE_URL}" ]]; then
	KEYCLOAK_BASE_URL="http://localhost:${keycloak_http_port}"
fi
if [[ -z "${KEYCLOAK_REALM}" ]]; then
	KEYCLOAK_REALM="agronomy-club"
fi
if [[ -z "${KEYCLOAK_ADMIN_REALM}" ]]; then
	KEYCLOAK_ADMIN_REALM="master"
fi
if [[ -z "${KEYCLOAK_ADMIN_CLIENT_ID}" ]]; then
	KEYCLOAK_ADMIN_CLIENT_ID="admin-cli"
fi
if [[ -z "${KEYCLOAK_ADMIN_USERNAME}" ]]; then
	KEYCLOAK_ADMIN_USERNAME="$(read_env_value FIRST_PLATFORM_ADMIN_USERNAME)"
fi
if [[ -z "${KEYCLOAK_ADMIN_USERNAME}" ]]; then
	KEYCLOAK_ADMIN_USERNAME="$(read_env_value FIRST_KEYCLOAK_ADMIN_USERNAME)"
fi
if [[ -z "${KEYCLOAK_ADMIN_USERNAME}" ]]; then
	KEYCLOAK_ADMIN_USERNAME="$(read_env_value KC_BOOTSTRAP_ADMIN_USERNAME)"
fi
if [[ -z "${KEYCLOAK_ADMIN_PASSWORD}" ]]; then
	KEYCLOAK_ADMIN_PASSWORD="$(read_env_value FIRST_PLATFORM_ADMIN_PASSWORD)"
fi
if [[ -z "${KEYCLOAK_ADMIN_PASSWORD}" ]]; then
	KEYCLOAK_ADMIN_PASSWORD="$(read_env_value FIRST_KEYCLOAK_ADMIN_PASSWORD)"
fi
if [[ -z "${KEYCLOAK_ADMIN_PASSWORD}" ]]; then
	KEYCLOAK_ADMIN_PASSWORD="$(read_env_value KC_BOOTSTRAP_ADMIN_PASSWORD)"
fi

TEST_USER_EMAIL="$(read_env_value KEYCLOAK_TEST_ADMIN_EMAIL)"
TEST_USER_USERNAME="$(read_env_value KEYCLOAK_TEST_ADMIN_USERNAME)"
TEST_USER_PASSWORD="$(read_env_value KEYCLOAK_TEST_ADMIN_PASSWORD)"
DJANGO_OIDC_CLIENT_ID="$(read_env_value DJANGO_OIDC_CLIENT_ID)"

if [[ -z "${TEST_USER_EMAIL}" ]]; then
	TEST_USER_EMAIL="$(read_env_value FIRST_PLATFORM_ADMIN_EMAIL)"
fi
if [[ -z "${TEST_USER_EMAIL}" ]]; then
	TEST_USER_EMAIL="$(read_env_value FIRST_DJANGO_ADMIN_EMAIL)"
fi
if [[ -z "${TEST_USER_EMAIL}" ]]; then
	TEST_USER_EMAIL="django-admin-test@example.com"
fi
if [[ -z "${TEST_USER_USERNAME}" ]]; then
	TEST_USER_USERNAME="$(read_env_value FIRST_PLATFORM_ADMIN_USERNAME)"
fi
if [[ -z "${TEST_USER_USERNAME}" ]]; then
	TEST_USER_USERNAME="$(read_env_value FIRST_DJANGO_ADMIN_USERNAME)"
fi
if [[ -z "${TEST_USER_USERNAME}" ]]; then
	TEST_USER_USERNAME="${TEST_USER_EMAIL}"
fi
if [[ -z "${TEST_USER_PASSWORD}" ]]; then
	TEST_USER_PASSWORD="$(read_env_value FIRST_PLATFORM_ADMIN_PASSWORD)"
fi
if [[ -z "${TEST_USER_PASSWORD}" ]]; then
	TEST_USER_PASSWORD="$(read_env_value FIRST_DJANGO_ADMIN_PASSWORD)"
fi
if [[ -z "${TEST_USER_PASSWORD}" ]]; then
	TEST_USER_PASSWORD="DjangoOIDC#2026"
fi
if [[ -z "${DJANGO_OIDC_CLIENT_ID}" ]]; then
	DJANGO_OIDC_CLIENT_ID="django-admin"
fi

if [[ -z "${KEYCLOAK_ADMIN_USERNAME}" || -z "${KEYCLOAK_ADMIN_PASSWORD}" ]]; then
	echo "Missing KEYCLOAK_ADMIN_USERNAME/KEYCLOAK_ADMIN_PASSWORD (or KC_BOOTSTRAP_ADMIN_*)" >&2
	exit 1
fi

for _ in {1..30}; do
	if curl -fsS "${KEYCLOAK_BASE_URL}/health/ready" >/dev/null 2>&1; then
		break
	fi
	sleep 2
done

ACCESS_TOKEN="$({
	curl -fsS -X POST "${KEYCLOAK_BASE_URL}/realms/${KEYCLOAK_ADMIN_REALM}/protocol/openid-connect/token" \
		-H 'Content-Type: application/x-www-form-urlencoded' \
		--data-urlencode "client_id=${KEYCLOAK_ADMIN_CLIENT_ID}" \
		--data-urlencode "username=${KEYCLOAK_ADMIN_USERNAME}" \
		--data-urlencode "password=${KEYCLOAK_ADMIN_PASSWORD}" \
		--data-urlencode 'grant_type=password' \
		${KEYCLOAK_ADMIN_CLIENT_SECRET:+--data-urlencode "client_secret=${KEYCLOAK_ADMIN_CLIENT_SECRET}"}
} | jq -r '.access_token')"

if [[ -z "${ACCESS_TOKEN}" || "${ACCESS_TOKEN}" == "null" ]]; then
	echo "Failed to obtain Keycloak admin access token" >&2
	exit 1
fi

DJANGO_OIDC_CLIENT_INTERNAL_ID="$(curl -fsS -G \
	-H "Authorization: Bearer ${ACCESS_TOKEN}" \
	--data-urlencode "clientId=${DJANGO_OIDC_CLIENT_ID}" \
	"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/clients" | jq -r '.[0].id // empty')"

if [[ -n "${DJANGO_OIDC_CLIENT_INTERNAL_ID}" ]]; then
	DJANGO_OIDC_CLIENT_SECRET="$(curl -fsS \
		-H "Authorization: Bearer ${ACCESS_TOKEN}" \
		"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/clients/${DJANGO_OIDC_CLIENT_INTERNAL_ID}/client-secret" | jq -r '.value // empty')"
	if [[ -n "${DJANGO_OIDC_CLIENT_SECRET}" ]]; then
		upsert_env_value DJANGO_OIDC_CLIENT_SECRET "${DJANGO_OIDC_CLIENT_SECRET}"
	fi
fi

user_lookup="$(curl -fsS -G \
	-H "Authorization: Bearer ${ACCESS_TOKEN}" \
	--data-urlencode "email=${TEST_USER_EMAIL}" \
	--data-urlencode "exact=true" \
	"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users")"

USER_ID="$(printf '%s' "${user_lookup}" | jq -r '.[0].id // empty')"

if [[ -z "${USER_ID}" ]]; then
	create_payload="$(jq -n \
		--arg username "${TEST_USER_USERNAME}" \
		--arg email "${TEST_USER_EMAIL}" \
		--arg password "${TEST_USER_PASSWORD}" \
		'{
			username: $username,
			email: $email,
			enabled: true,
			emailVerified: true,
			credentials: [{type: "password", value: $password, temporary: false}]
		}')"

	curl -fsS -X POST \
		-H "Authorization: Bearer ${ACCESS_TOKEN}" \
		-H 'Content-Type: application/json' \
		-d "${create_payload}" \
		"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users" >/dev/null

	user_lookup="$(curl -fsS -G \
		-H "Authorization: Bearer ${ACCESS_TOKEN}" \
		--data-urlencode "email=${TEST_USER_EMAIL}" \
		--data-urlencode "exact=true" \
		"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users")"
	USER_ID="$(printf '%s' "${user_lookup}" | jq -r '.[0].id // empty')"
fi

if [[ -z "${USER_ID}" ]]; then
	echo "Unable to resolve test user id in Keycloak" >&2
	exit 1
fi

update_payload="$(jq -n \
	--arg username "${TEST_USER_USERNAME}" \
	--arg email "${TEST_USER_EMAIL}" \
	'{username: $username, email: $email, enabled: true, emailVerified: true}')"

curl -fsS -X PUT \
	-H "Authorization: Bearer ${ACCESS_TOKEN}" \
	-H 'Content-Type: application/json' \
	-d "${update_payload}" \
	"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users/${USER_ID}" >/dev/null

reset_payload="$(jq -n --arg password "${TEST_USER_PASSWORD}" '{type: "password", value: $password, temporary: false}')"
curl -fsS -X PUT \
	-H "Authorization: Bearer ${ACCESS_TOKEN}" \
	-H 'Content-Type: application/json' \
	-d "${reset_payload}" \
	"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users/${USER_ID}/reset-password" >/dev/null

platform_admin_role="$(curl -fsS \
	-H "Authorization: Bearer ${ACCESS_TOKEN}" \
	"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/roles/platform_admin")"

current_roles="$(curl -fsS \
	-H "Authorization: Bearer ${ACCESS_TOKEN}" \
	"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users/${USER_ID}/role-mappings/realm/composite")"

if ! printf '%s' "${current_roles}" | jq -e '.[] | select(.name == "platform_admin")' >/dev/null; then
	curl -fsS -X POST \
		-H "Authorization: Bearer ${ACCESS_TOKEN}" \
		-H 'Content-Type: application/json' \
		-d "[$platform_admin_role]" \
		"${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users/${USER_ID}/role-mappings/realm" >/dev/null
fi

echo "Keycloak test admin user ready: ${TEST_USER_EMAIL} (role=platform_admin)"
