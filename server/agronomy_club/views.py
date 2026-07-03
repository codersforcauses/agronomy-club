from rest_framework.decorators import api_view
from rest_framework import generics
from django.http import HttpResponse
from .models import Quiz
from .serializers import QuizDataSerializer


# Create your views here.
@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


class QuizDataAPIView(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizDataSerializer
    lookup_field = "id"
