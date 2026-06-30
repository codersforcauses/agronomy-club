from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path("ping/", views.ping, name="ping"),
    path("events/", views.EventListAPIView.as_view(), name="events-list"),
]

# Override styling of the admin dashboard here
admin.site.site_header = "Agronomy Club - Admin Dashboard"
admin.site.site_title = "Site administration | Agronomy Club"
