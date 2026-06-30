from rest_framework import generics
from rest_framework.decorators import api_view

from django.http import HttpResponse

from .models import Event
from .serializers import EventListSerializer


# Create your views here.
@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


class EventListAPIView(generics.ListAPIView):
    """
    GET /api/events/
    Returns a list of events.
    """
    serializer_class = EventListSerializer

    def get_queryset(self):
        return Event.objects.all().order_by("id")
