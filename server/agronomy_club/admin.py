from django.contrib import admin  # noqa
from api.chapters.models import Chapters


# Register your models here.
@admin.register(Chapters)
class ChaptersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbrev', 'location', 'email')
    search_fields = ('id', 'name', 'abbrev', 'location')
    pass
