from rest_framework import generics
from .serializers import QuizSerializer, QuizDataSerializer, ResourceSerializer, ResourceTypeTagSerializer, EventListSerializer, AlumniSerializer, ChapterSerializer, ListedChapterSerializer  # noqa: E501
from .models import Resource, ResourceTypeTag, Users, Event, Quiz, Chapters
from rest_framework.decorators import api_view
from django.http import HttpResponse


# Create your views here.
@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


class QuizDataAPIView(generics.RetrieveAPIView):
    serializer_class = QuizDataSerializer
    lookup_field = "id"

    def get_queryset(self):
        return Quiz.objects.filter(public=True)


class ResourceTypeTagListAPIView(generics.ListAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer


class ResourceListAPIView(generics.ListAPIView):
    serializer_class = ResourceSerializer

    def get_queryset(self):
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
    serializer_class = AlumniSerializer

    def get_queryset(self):
        return Users.objects.filter(global_role="alumni").order_by("-grad_yr")


class EventListAPIView(generics.ListAPIView):
    """
    GET /api/events/
    Returns a list of events.
    """
    serializer_class = EventListSerializer

    def get_queryset(self):
        return Event.objects.all().order_by("-date")


class QuizListAPIView(generics.ListAPIView):
    """
    GET /api/quizzes/
    Returns a list of quizzes
    """
    serializer_class = QuizSerializer

    def get_queryset(self):
        return Quiz.objects.filter(public=True).order_by("-upload_date")


class ChapterListAPIView(generics.ListAPIView):
    serializer_class = ListedChapterSerializer

    def get_queryset(self):
        return Chapters.objects.all()
