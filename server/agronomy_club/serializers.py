from rest_framework import serializers
from .models import Quiz, Resource, ResourceTypeTag, Event, Users, Chapters, ChapterMemberships


class QuizDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["quiz_data"]


class ResourceTypeTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceTypeTag
        fields = [
            'id',
            'name',
            'lucide_name'
            ]


class ResourceSerializer(serializers.ModelSerializer):
    # type tag serializer for read request (show name and color)
    type_tags = ResourceTypeTagSerializer(many=True, read_only=True)

    chapter_name = serializers.CharField(source="chapter.name")
    chapter_colour = serializers.CharField(source="chapter.colour")

    class Meta:
        model = Resource
        fields = [
            'id',
            'chapter_name',
            'name',
            'link',
            'upload_date',
            'type_tags',
            'chapter_colour',
            ]


class AlumniSerializer(serializers.ModelSerializer):
    chapters = serializers.SerializerMethodField()

    class Meta:
        model = Users
        fields = [
            'id',
            'full_name',
            'grad_yr',
            'discipline',
            'email',
            'photo',
            'chapters',
        ]

    def get_chapters(self, obj: Users):
        chapter_data = []
        for membership in obj.user_memberships.all():
            chapter_data.append({
                'abbrev': membership.chapter_id.abbrev,
                'colour': membership.chapter_id.colour
            })

        return chapter_data


class EventListSerializer(serializers.ModelSerializer):
    chapterName = serializers.CharField(source="chapter.name")
    chapterColour = serializers.CharField(source="chapter.colour")

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "description",
            "location",
            "date",
            "thumbnail",
            "link",
            "chapterName",
            "chapterColour"
        ]


class ListedChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapters
        fields = [
            'id',
            'name',
            'abbrev',
            'logo',
            'location',
            'desc',
            'colour',
        ]


class CommitteeSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="user_id.full_name")
    email = serializers.CharField(source="user_id.email")
    photo = serializers.SerializerMethodField()

    class Meta:
        model = ChapterMemberships
        fields = [
            "id",
            "full_name",
            "email",
            "position",
            "photo"
        ]

    def get_photo(self, obj):
        path = obj.user_id.photo

        if not path:
            return None

        request = self.context.get('request')

        if request is not None:
            return f"{request.build_absolute_uri(path).split('/api')[0]}/media/{path}"

        return path


class ChapterSerializer(serializers.ModelSerializer):
    # resources serializer for read request
    # (show all resources owned by chapter)
    resources = ResourceSerializer(many=True, read_only=True)
    committee = serializers.SerializerMethodField()

    class Meta:
        model = Chapters
        fields = [
            "id",
            "name",
            "abbrev",
            "logo",
            "location",
            "desc",
            "email",
            "colour",
            "resources",
            "committee",
        ]

    def get_committee(self, obj):
        query_param = self.context['request'].query_params.get('committee')
        if query_param == 'exec':
            executives = obj.chapter_memberships.filter(position__in=["pres", "vpres", "sec", "treas"])
            return CommitteeSerializer(executives, many=True, context=self.context).data
        if query_param == 'all':
            committee = obj.chapter_memberships.filter(position__in=["pres", "vpres", "sec", "treas", "mark", "ocm"])
            return CommitteeSerializer(committee, many=True, context=self.context).data

        raise serializers.ValidationError("The provided URL param for committee is invalid.")


class QuizSerializer(serializers.ModelSerializer):
    chapterName = serializers.CharField(source="chapter.name")
    chapterColour = serializers.CharField(source="chapter.colour")

    class Meta:
        model = Quiz
        fields = [
            "id",
            "name",
            "chapterName",
            "upload_date",
            "chapterColour",
        ]
