from rest_framework.decorators import api_view
from rest_framework import generics

from .models import Resource, ResourceTypeTag
from .serializers import ResourceSerializer, ResourceTypeTagSerializer

from django.http import HttpResponse


# Create your views here.
@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


class ResourceTypeTagList(generics.ListAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer

    # TODO: guest permission


class ResourceTypeTagCreate(generics.CreateAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer

    # TODO: super admin permission


class ResourceTypeTagRetreiveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer

    # TODO: super admin permission


class ResourceList(generics.ListAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    # TODO: guest permission


class ResourceCreate(generics.CreateAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    # TODO: chapter admin permission


class ResourceRetreiveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    # TODO: chapter admin permission
