from django.contrib import admin  # noqa
from agronomy_club.models import Chapters, Resources  # noqa


# Register your models here.
@admin.register(Chapters)
class ChaptersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbrev', 'location', 'email')
    search_fields = ('id', 'name', 'abbrev', 'location')
    pass


@admin.register(Resources)
class ResourcesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'chapter_id', 'link')
    search_fields = ('id', 'name')
    pass
