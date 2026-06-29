from rest_framework.decorators import api_view
from rest_framework import generics

from .models import Resource, ResourceTypeTag
from .serializers import ResourceSerializer, ResourceTypeTagSerializer

from django.http import HttpResponse


# Create your views here.
@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


class ResourceTypeTagListCreateAPIView(generics.ListCreateAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer

    # TODO: guest permission for GET (list), super admin permission for POST (create)


class ResourceTypeTagRetreiveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ResourceTypeTag.objects.all()
    serializer_class = ResourceTypeTagSerializer

    # TODO: super admin permission


class ResourceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    # TODO: guest permission for GET (list), chapter admin permission for POST (create)


class ResourceRetreiveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    # TODO: chapter admin permission
