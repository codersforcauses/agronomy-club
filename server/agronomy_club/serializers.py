from rest_framework import serializers
from .models import Quiz, Resource, ResourceTypeTag, Event, User


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
        model = User
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


class NormalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name", "grad_yr", "discipline", "email", "global_role"]


class UserSignupSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    grad_yr = serializers.IntegerField()
    discipline = serializers.CharField(max_length=100)
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(write_only=True, min_length=8, trim_whitespace=False)

    def validate_email(self, value):
        lowered = value.strip().lower()
        if User.objects.filter(email__iexact=lowered).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return lowered


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(write_only=True, trim_whitespace=False)
