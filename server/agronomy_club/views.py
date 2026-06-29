from rest_framework.decorators import api_view
from rest_framework import generics

from .models import Resource, ResourceTypeTag
from .serializers import ResourceSerializer, ResourceTypeTagSerializer

from django.http import HttpResponse


# Create your views here.
@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


class ResourceTypeTagListAPIView(generics.ListAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer

    # TODO: guest permission


class ResourceListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ResourceSerializer

    def get_queryset(self):
        self.queryset = Resource.objects.all().order_by("-upload_date")
        tags = self.request.GET.get("tags")
        if tags:
            tag_ids = [t for t in tags.split(",") if t.strip().isdigit()]
            if tag_ids:
                self.queryset = self.queryset.filter(type_tags__id__in=tag_ids).distinct()

        return self.queryset

    # TODO: guest permission for GET (list), chapter admin permission for POST (create)


class ResourceRetreiveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    # TODO: chapter admin permission
