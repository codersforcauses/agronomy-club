from django.db import models  # noqa

# Create your models here.
class Quiz(models.Model):
    name = models.CharField(max_length=30)
    public = models.BooleanField()
    chapter = models.ForeignKey("Chapter", on_delete=models.CASCADE)
    upload_date = models.DateTimeField(auto_now_add=True)
    quiz_data = models.JSONField()