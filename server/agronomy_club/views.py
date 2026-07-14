from rest_framework import generics
from typing import Any, cast
from django.db.models import QuerySet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .serializers import (QuizSerializer, QuizDataSerializer, ResourceSerializer, ResourceTypeTagSerializer, EventListSerializer, AlumniSerializer, ChapterSerializerUserSignupSerializer, UserLoginSerializer, NormalUserSerializer,)  # noqa: E501
from .models import Resource, ResourceTypeTag, Users, Event, Quiz, Chapters


# Create your views here.
@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


class QuizDataAPIView(generics.RetrieveAPIView):
    queryset = Quiz.objects.none()
    serializer_class = QuizDataSerializer
    lookup_field = "id"

    def get_queryset(self) -> QuerySet[Quiz]:  # type: ignore[override]
        return Quiz.objects.filter(public=True).all()


class ResourceTypeTagListAPIView(generics.ListAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer


class ResourceListAPIView(generics.ListAPIView):
    queryset = Resource.objects.none()
    serializer_class = ResourceSerializer

    def get_queryset(self) -> QuerySet[Resource]:  # type: ignore[override]
        queryset = Resource.objects.all().order_by("-upload_date")
        tags = self.request.GET.get("tags")
        if tags:
            tag_ids = [t for t in tags.split(",") if t.strip().isdigit()]
            if tag_ids:
                queryset = queryset.filter(type_tags__id__in=tag_ids).distinct()

        return queryset


class IndividualChapterAPIView(generics.RetrieveAPIView):
    serializer_class = ChapterSerializer
    lookup_field = "id"

    def get_queryset(self):
        return Chapters.objects.all()


class AlumniListAPIView(generics.ListAPIView):
    queryset = User.objects.none()
    serializer_class = AlumniSerializer

    def get_queryset(self) -> QuerySet[User]:  # type: ignore[override]
        return User.objects.filter(global_role="alumni").order_by("-grad_yr").all()


class EventListAPIView(generics.ListAPIView):
    """
    GET /api/events/
    Returns a list of events.
    """
    queryset = Event.objects.none()
    serializer_class = EventListSerializer

    def get_queryset(self) -> QuerySet[Event]:  # type: ignore[override]
        return Event.objects.all().order_by("-date")


class QuizListAPIView(generics.ListAPIView):
    """
    GET /api/quizzes/
    Returns a list of quizzes
    """
    queryset = Quiz.objects.none()
    serializer_class = QuizSerializer

    def get_queryset(self) -> QuerySet[Quiz]:  # type: ignore[override]
        return Quiz.objects.filter(public=True).order_by("-upload_date").all()


class UserSignupAPIView(APIView):
    """
    POST /api/auth/signup/
    Creates a normal user account for frontend authentication.
    """

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = cast(dict[str, Any], serializer.validated_data)

        user = User(
            full_name=validated["full_name"],
            grad_yr=validated["grad_yr"],
            discipline=validated["discipline"],
            email=validated["email"],
            global_role="user",
        )
        user.set_password(validated["password"])
        user.full_clean()
        user.save()

        return Response(
            {
                "message": "Signup successful.",
                "user": NormalUserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )


class UserLoginAPIView(APIView):
    """
    POST /api/auth/login/
    Authenticates a normal user by email and password.
    """

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = cast(dict[str, Any], serializer.validated_data)

        email = validated["email"].strip().lower()
        password = validated["password"]

        user = User.objects.filter(email__iexact=email).first()
        if user is None or not user.check_password(password):
            return Response(
                {"detail": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {
                "message": "Login successful.",
                "user": NormalUserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )
