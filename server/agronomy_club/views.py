from rest_framework import generics
from .serializers import QuizDataSerializer, ResourceSerializer, ResourceTypeTagSerializer, EventListSerializer
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .models import Quiz, Resource, ResourceTypeTag, Event


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
        self.queryset = Resource.objects.all().order_by("-upload_date")
        tags = self.request.GET.get("tags")
        if tags:
            tag_ids = [t for t in tags.split(",") if t.strip().isdigit()]
            if tag_ids:
                self.queryset = self.queryset.filter(type_tags__id__in=tag_ids).distinct()

        return self.queryset


class EventListAPIView(generics.ListAPIView):
    """
    GET /api/events/
    Returns a list of events.
    """
    serializer_class = EventListSerializer

    def get_queryset(self):
        return Event.objects.all().order_by("-date")
