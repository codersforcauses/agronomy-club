from rest_framework import serializers
from .models import Quiz, Resource, ResourceTypeTag, Event, User, ChapterMemberships, Chapter


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


class ListedChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
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
        model = Chapter
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
