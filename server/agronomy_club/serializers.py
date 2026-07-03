from rest_framework import serializers
from .models import Quiz


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["id", "name", "public", "chapter", "upload_date"]


class QuizDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["quiz_data"]
