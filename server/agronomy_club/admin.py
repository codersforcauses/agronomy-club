from django.contrib import admin  # noqa
from agronomy_club.models import ChapterMemberships, Users, Quiz, Chapters, Resource, ResourceTypeTag, Event  # noqa


# Register your models here.
@admin.register(Chapters)
class ChaptersAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbrev', 'location', 'email')
    search_fields = ('id', 'name', 'abbrev', 'location')
    pass


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'public', 'chapter', 'upload_date')
    search_fields = ('id', 'name', 'chapter__name')


@admin.register(ResourceTypeTag)
class ResourceTypeTagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'color')
    search_fields = ('name',)


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'link', 'chapter', 'upload_date')
    search_fields = ('id', 'name', 'link')
    list_filter = ('type_tags', 'chapter')


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'location', 'date', 'chapter')
    search_fields = ('id', 'title', 'location', 'chapter__name')
    list_filter = ('chapter',)


@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'grad_yr', 'discipline', 'email', 'global_role')
    search_fields = ('id', 'full_name', 'discipline',)
    list_filter = ('grad_yr', 'global_role')


@admin.register(ChapterMemberships)
class ChapterMembershipsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'chapter_role', 'chapter_id', 'position')
    search_fields = ('id', 'user_id__full_name', 'chapter_id__name')
    list_filter = ('chapter_role',)
