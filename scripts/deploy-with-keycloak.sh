#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${ROOT_DIR}/docker-compose.yml"
ENV_FILE="${ROOT_DIR}/.env"

if [[ "${1:-}" == "--prod" ]]; then
  COMPOSE_FILE="${ROOT_DIR}/docker-compose.prod.yml"
  ENV_FILE="${ROOT_DIR}/.env.prod"
fi

"${ROOT_DIR}/scripts/bootstrap-keycloak-env.sh" "${ENV_FILE}"

mkdir -p "${ROOT_DIR}/keycloak/import"
cp "${ROOT_DIR}/keycloak/agronomy-club-realm-skeleton.json" \
  "${ROOT_DIR}/keycloak/import/agronomy-club-realm-skeleton.json"

docker compose -f "${COMPOSE_FILE}" up -d

"${ROOT_DIR}/scripts/sync-keycloak-first-admin-password.sh" "${ENV_FILE}"

if [[ "${COMPOSE_FILE}" == *"docker-compose.yml" ]]; then
  "${ROOT_DIR}/scripts/ensure-keycloak-test-admin.sh" "${ENV_FILE}"
fi

echo "Deployment started with ${COMPOSE_FILE}"
