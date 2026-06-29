from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path("ping/", views.ping, name="ping"),

    # Resources
    path("resources/", views.ResourceListCreateAPIView.as_view(), name="resource-list-create"),
    path("resources/<int:pk>/", views.ResourceRetreiveUpdateDestroyAPIView.as_view(), name="resource-detail"),

    # Resource type tags
    path("resource-type-tags/", views.ResourceTypeTagListAPIView.as_view(), name="resource-type-tag-list"),
]

# Override styling of the admin dashboard here
admin.site.site_header = "Agronomy Club - Admin Dashboard"
admin.site.site_title = "Site administration | Agronomy Club"
