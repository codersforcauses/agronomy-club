from urllib.parse import urlencode

from django.http import HttpRequest
from django.shortcuts import redirect
from django.urls import reverse


def admin_login_via_oidc(request: HttpRequest):
    next_url = request.GET.get("next") or "/admin/"
    query = urlencode({"next": next_url})
    return redirect(f"{reverse('oidc_authentication_init')}?{query}")
