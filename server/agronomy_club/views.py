from rest_framework.decorators import api_view
from rest_framework import generics

from .serializers import QuizSerializer
from .models import Quiz

from django.http import HttpResponse


# Create your views here.
@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


class QuizListAPIView(generics.ListAPIView):
    """
    GET /api/quizzes/
    Returns a list of quizzes
    """
    serializer_class = QuizSerializer

    def get_queryset(self):
        return Quiz.objects.filter(public=True).order_by("-upload_date")
