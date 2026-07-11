from rest_framework import serializers
from .models import Quiz, Resource, ResourceTypeTag, Event, Users, Chapters


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


class ChapterSerializer(serializers.ModelSerializer):
    # resources serializer for read request
    # (show all resources owned by chapter)
    resources = ResourceSerializer(many=True, read_only=True)
    logo_url = serializers.SerializerMethodField()

    def get_logo_url(self, obj):
        if not obj.logo:
            return None

        logo_path = obj.logo.url
        request = self.context.get("request")
        if request is None:
            return logo_path

        return request.build_absolute_uri(logo_path)

    class Meta:
        model = Chapters
        fields = [
            "id",
            "name",
            "abbrev",
            "logo",
            "logo_url",
            "location",
            "desc",
            "email",
            "colour",
            "resources",
        ]


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
