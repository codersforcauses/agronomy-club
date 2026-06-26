from django.contrib import admin  # noqa
from agronomy_club.models import Users, Chapters, Resource, ResourceTypeTag  # noqa


# Register your models here.
@admin.register(Chapters)
class ChaptersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbrev', 'location', 'email')
    search_fields = ('id', 'name', 'abbrev', 'location')


@admin.register(ResourceTypeTag)
class ResourceTypeTagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'color')
    search_fields = ('name',)


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'link', 'chapter', 'upload_date')
    search_fields = ('id', 'name', 'link')
    list_filter = ('type_tags', 'chapter')


@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'grad_yr', 'discipline', 'email', 'global_role')
    search_fields = ('id', 'full_name', 'discipline',)
    list_filter = ('grad_yr', 'global_role')
