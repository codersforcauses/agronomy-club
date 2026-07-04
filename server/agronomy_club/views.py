from rest_framework import generics
from rest_framework.decorators import api_view

from .models import Resource, ResourceTypeTag, Chapters, Event
from .serializers import ResourceSerializer, ResourceTypeTagSerializer, ChapterSerializer

from django.http import HttpResponse

# Create your views here.
@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


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
    queryset = Chapters.objects.all().order_by("name")
    serializer_class = ChapterSerializer
    lookup_url_kwarg = "id"


class EventListAPIView(generics.ListAPIView):
    """
    GET /api/events/
    Returns a list of events.
    """
    serializer_class = EventListSerializer

    def get_queryset(self):
        return Event.objects.all().order_by("-date")