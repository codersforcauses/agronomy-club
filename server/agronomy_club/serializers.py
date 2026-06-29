from rest_framework import serializers
from .models import Resource, ResourceTypeTag


class ResourceTypeTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceTypeTag
        fields = ['id', 'name', 'color']


class ResourceSerializer(serializers.ModelSerializer):
    # type tag serializer for read request (show name and color)
    type_tags = ResourceTypeTagSerializer(many=True, read_only=True)

    # type tag serializer for write request
    type_tag_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=ResourceTypeTag.objects.all(),
        source='type_tags',
        write_only=True,
        required=False,
    )

    # TODO : add chapter serializer (easier frontend)

    class Meta:
        model = Resource
        fields = ['id', 'chapter', 'name', 'link', 'upload_date', 'type_tags', 'type_tag_ids']
