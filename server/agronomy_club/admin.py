from django.contrib import admin  # noqa
from agronomy_club.models import Chapters, Quiz  # noqa


# Register your models here.
@admin.register(Chapters)
class ChaptersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbrev', 'location', 'email')
    search_fields = ('id', 'name', 'abbrev', 'location')
    pass


admin.site.register(Quiz)
