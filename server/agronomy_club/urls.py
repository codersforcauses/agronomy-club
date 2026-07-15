from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path("ping/", views.ping, name="ping"),

    # Chapters
    path("chapters/<int:id>/", views.IndividualChapterAPIView.as_view(), name="individual-chapter"),

    # Quiz
    path("quizzes/download/<int:id>/", views.QuizDataAPIView.as_view(), name="quiz-download"),

    # Resources
    path("resources/", views.ResourceListAPIView.as_view(), name="resource-list"),

    # Resource type tags
    path("resource-type-tags/", views.ResourceTypeTagListAPIView.as_view(), name="resource-type-tag-list"),

    # Alumni
    path("alumni/", views.AlumniListAPIView.as_view(), name="alumni-list"),

    # Events
    path("events/", views.EventListAPIView.as_view(), name="events-list"),

    # Quiz List
    path("quizzes/", views.QuizListAPIView.as_view(), name="quiz-list"),

    # Chapters
    path("chapters/", views.ChapterListAPIView.as_view(), name='chapter-list')
]

# Override styling of the admin dashboard here
admin.site.site_header = "Agronomy Club - Admin Dashboard"
admin.site.site_title = "Site administration | Agronomy Club"
