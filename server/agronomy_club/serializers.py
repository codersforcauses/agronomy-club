from rest_framework import serializers
<<<<<<< HEAD
from .models import Quiz, Resource, ResourceTypeTag, Event


class QuizDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["quiz_data"]
=======
from .models import Resource, ResourceTypeTag, Event, Users
>>>>>>> d59a4acd0c25cf8e1b974ffa8c0d402ef6dd867b


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
