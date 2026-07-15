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
            'color'
            ]


class ResourceSerializer(serializers.ModelSerializer):
    # type tag serializer for read request (show name and color)
    type_tags = ResourceTypeTagSerializer(many=True, read_only=True)

    # TODO : add chapter serializer (easier frontend)

    chapter_name = serializers.CharField(source="chapter.name")

    class Meta:
        model = Resource
        fields = [
            'id',
            'chapter',
            'chapter_name',
            'name',
            'link',
            'upload_date',
            'type_tags'
            ]


class AlumniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        exclude = ['global_role']


class EventListSerializer(serializers.ModelSerializer):
    chapterName = serializers.CharField(source="chapter.name")

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "description",
            "location",
            "date",
            "thumbnail",
            "chapterName",
        ]


class CommitteeSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="user_id.full_name")
    email = serializers.CharField(source="user_id.email")

    class Meta:
        model = ChapterMemberships
        fields = [
            "id",
            "full_name",
            "email",
            "position",
        ]


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
        executives = obj.chapter_memberships.filter(position__in=["pres", "vpres", "sec", "treas"])
        return CommitteeSerializer(executives, many=True).data


class QuizSerializer(serializers.ModelSerializer):
    chapterName = serializers.CharField(source="chapter.name")

    class Meta:
        model = Quiz
        fields = [
            "id",
            "name",
            "chapterName",
            "upload_date",
        ]
