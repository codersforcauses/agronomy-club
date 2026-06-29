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


class ResourceTypeTagCreateAPIView(generics.CreateAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer

    # TODO: super admin permission


class ResourceTypeTagRetreiveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer

    # TODO: super admin permission


class ResourceListAPIView(generics.ListAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    # TODO: guest permission


class ResourceCreateAPIView(generics.CreateAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    # TODO: chapter admin permission


class ResourceRetreiveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    # TODO: chapter admin permission
