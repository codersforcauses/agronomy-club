from rest_framework import serializers
from .models import Resource, ResourceTypeTag, Users


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
