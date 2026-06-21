from django.db import models

#Model for chapters information such as logo, location, description and email. Chapter members should be stored in a seperate model.
class Chapters(models.Model):
    id = models.AutoField(primary_key=True, one_to_many=True, editable=False, unique=True)
    logo = models.URLField()
    location = models.CharField(max_length=255)
    desc = models.TextField()
    email = models.EmailField(max_length=255)




