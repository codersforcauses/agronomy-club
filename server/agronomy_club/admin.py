from django.contrib import admin
import unfold
from agronomy_club.models import ChapterMemberships, Users, Quiz, Chapters, Resource, ResourceTypeTag, Event  # noqa


# Register your models here.
@admin.register(Chapters)
class ChaptersAdmin(unfold.admin.ModelAdmin):
    list_display = ('id', 'name', 'abbrev', 'location', 'email')
    search_fields = ('id', 'name', 'abbrev', 'location')


@admin.register(Quiz)
class QuizAdmin(unfold.admin.ModelAdmin):
    list_display = ('id', 'name', 'public', 'chapter', 'upload_date')
    search_fields = ('id', 'name', 'chapter__name')


@admin.register(ResourceTypeTag)
class ResourceTypeTagAdmin(unfold.admin.ModelAdmin):
    list_display = ('id', 'name', 'lucide_name')
    search_fields = ('name', 'lucide_name')

    # Make resource type tag immutable in admin dashboard
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Resource)
class ResourceAdmin(unfold.admin.ModelAdmin):
    list_display = ('id', 'name', 'link', 'chapter', 'upload_date')
    search_fields = ('id', 'name', 'link')
    list_filter = ('type_tags', 'chapter')


@admin.register(Event)
class EventAdmin(unfold.admin.ModelAdmin):
    list_display = ('id', 'title', 'location', 'date', 'chapter')
    search_fields = ('id', 'title', 'location', 'chapter__name')
    list_filter = ('chapter',)


@admin.register(Users)
class UsersAdmin(unfold.admin.ModelAdmin):
    list_display = ('id', 'full_name', 'grad_yr', 'discipline', 'email', 'global_role')
    search_fields = ('id', 'full_name', 'discipline',)
    list_filter = ('grad_yr', 'global_role')


@admin.register(ChapterMemberships)
class ChapterMembershipsAdmin(unfold.admin.ModelAdmin):
    list_display = ('id', 'user_id', 'chapter_role', 'chapter_id', 'position')
    search_fields = ('id', 'user_id__full_name', 'chapter_id__name')
    list_filter = ('chapter_role',)
