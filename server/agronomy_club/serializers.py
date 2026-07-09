import re
from rest_framework import serializers
from .models import Resource, ResourceTypeTag, Event, Chapters

HEX_COLOUR_RE = re.compile(r'^#[0-9a-fA-F]{6}$')


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


class ChaptersSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()

    class Meta:
        model = Chapters
        fields = [
            'id',
            'name',
            'abbrev',
            'logo',
            'location',
            'desc',
            'email',
            'colour'
        ]

    def get_logo(self, obj):
        if not obj.logo:
            return None
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.logo.url)
        return obj.logo.url

    def validate_colour(self, value):
        if not HEX_COLOUR_RE.match(value):
            raise serializers.ValidationError(
                "Color must be a valid 6-digit hex code: #RRGGBB."
            )
        return value
