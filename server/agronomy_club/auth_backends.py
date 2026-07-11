import logging
import json
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings
from django.contrib.auth import get_user_model
from mozilla_django_oidc.auth import OIDCAuthenticationBackend


logger = logging.getLogger(__name__)


class KeycloakOIDCAuthenticationBackend(OIDCAuthenticationBackend):
    """Maps Keycloak OIDC claims to Django users and admin privileges."""

    _admin_access_token = None
    _admin_access_token_expiry = 0

    def _extract_roles(self, claims):
        roles = set()

        nested_roles = (claims.get("realm_access") or {}).get("roles") or []
        roles.update(nested_roles)

        dotted_roles = claims.get("realm_access.roles") or []
        if isinstance(dotted_roles, str):
            roles.add(dotted_roles)
        else:
            roles.update(dotted_roles)

        top_level_roles = claims.get("roles") or []
        if isinstance(top_level_roles, str):
            roles.add(top_level_roles)
        else:
            roles.update(top_level_roles)

        return roles

    def _http_json(self, url, method="GET", headers=None, form_data=None):
        request_headers = headers.copy() if headers else {}
        request_body = None

        if form_data is not None:
            request_body = urlencode(form_data).encode("utf-8")
            request_headers["Content-Type"] = "application/x-www-form-urlencoded"

        req = Request(url=url, data=request_body, headers=request_headers, method=method)
        with urlopen(req, timeout=5) as response:
            raw = response.read().decode("utf-8")
        return json.loads(raw) if raw else {}

    def _keycloak_base(self):
        return (settings.KEYCLOAK_BASE_URL or "").rstrip("/")

    def _get_admin_access_token(self):
        now = int(time.time())
        if self._admin_access_token and now < self._admin_access_token_expiry:
            return self._admin_access_token

        if not settings.KEYCLOAK_ADMIN_USERNAME or not settings.KEYCLOAK_ADMIN_PASSWORD:
            return None

        token_url = (
            f"{self._keycloak_base()}/realms/{settings.KEYCLOAK_ADMIN_REALM}"
            "/protocol/openid-connect/token"
        )
        form_data = {
            "grant_type": "password",
            "client_id": settings.KEYCLOAK_ADMIN_CLIENT_ID,
            "username": settings.KEYCLOAK_ADMIN_USERNAME,
            "password": settings.KEYCLOAK_ADMIN_PASSWORD,
        }
        if settings.KEYCLOAK_ADMIN_CLIENT_SECRET:
            form_data["client_secret"] = settings.KEYCLOAK_ADMIN_CLIENT_SECRET

        try:
            token_response = self._http_json(token_url, method="POST", form_data=form_data)
        except (HTTPError, URLError, TimeoutError, ValueError) as exc:
            logger.warning("Keycloak admin token request failed: %s", exc)
            return None

        access_token = token_response.get("access_token")
        expires_in = int(token_response.get("expires_in") or 60)
        if not access_token:
            return None

        self._admin_access_token = access_token
        self._admin_access_token_expiry = now + max(expires_in - 10, 10)
        return self._admin_access_token

    def _fetch_effective_realm_roles(self, claims):
        if not getattr(settings, "KEYCLOAK_SYNC_EFFECTIVE_ROLES", False):
            return set()

        subject = claims.get("sub")
        if not subject:
            return set()

        token = self._get_admin_access_token()
        if not token:
            return set()

        url = (
            f"{self._keycloak_base()}/admin/realms/{settings.KEYCLOAK_REALM}"
            f"/users/{subject}/role-mappings/realm/composite"
        )
        headers = {"Authorization": f"Bearer {token}"}

        try:
            role_payload = self._http_json(url, headers=headers)
        except (HTTPError, URLError, TimeoutError, ValueError) as exc:
            logger.warning("Keycloak effective role fetch failed for sub=%s: %s", subject, exc)
            return set()

        roles = set()
        if isinstance(role_payload, list):
            for role in role_payload:
                role_name = (role or {}).get("name")
                if role_name:
                    roles.add(role_name)
        return roles

    def _resolve_roles(self, claims):
        roles = self._extract_roles(claims)
        roles.update(self._fetch_effective_realm_roles(claims))
        return roles

    def _apply_role_flags(self, user, claims):
        roles = self._resolve_roles(claims)
        is_platform_admin = "platform_admin" in roles

        user.is_active = True
        user.is_staff = is_platform_admin
        user.is_superuser = is_platform_admin
        user.save(update_fields=["is_active", "is_staff", "is_superuser"])

    def filter_users_by_claims(self, claims):
        UserModel = get_user_model()
        email = claims.get("email")
        if email:
            users = UserModel.objects.filter(email__iexact=email)
            for user in users:
                self._apply_role_flags(user, claims)
            return users

        username = claims.get("preferred_username")
        if username:
            users = UserModel.objects.filter(username__iexact=username)
            for user in users:
                self._apply_role_flags(user, claims)
            return users

        return UserModel.objects.none()

    def create_user(self, claims):
        UserModel = get_user_model()
        email = claims.get("email") or ""
        base_username = claims.get("preferred_username") or (email.split("@")[0] if email else "kc-user")
        username = base_username
        suffix = 1

        while UserModel.objects.filter(username=username).exists():
            username = f"{base_username}-{suffix}"
            suffix += 1

        user = UserModel.objects.create_user(
            username=username,
            email=email,
            first_name=claims.get("given_name", ""),
            last_name=claims.get("family_name", ""),
        )
        return self.update_user(user, claims)

    def update_user(self, user, claims):
        user.email = claims.get("email", user.email)
        user.first_name = claims.get("given_name", user.first_name)
        user.last_name = claims.get("family_name", user.last_name)
        user.save(update_fields=["email", "first_name", "last_name"])
        self._apply_role_flags(user, claims)

        return user
