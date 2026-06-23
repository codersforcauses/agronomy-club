from django.db import models  # noqa
from colorfield.fields import ColorField  # noqa
# Model for chapters information such as logo, location, description and email. Chapter members should be stored in a seperate model.
# This model uses django-colorfield to store the colour of the chapter as well as provide a color picker widget in admin panel.
# Documentation can be found here: https://github.com/fabiocaccamo/django-colorfield#readme


def generate_random_hex():
    import random

    return "#{:06x}".format(random.randint(0, 0xFFFFFF))  # Generate random hex colour code


# Should only be ran once when new chapter is created with no provided color.
# Can also be delegated to the form if needed instead of the model, but this is more convenient for now.
def random_color():
    while True:
        new_color = generate_random_hex()

        # If color does not exist yet in database then return it, otherwise generate a new one
        if not Chapters.objects.filter(colour=new_color).exists():
            return new_color


class Chapters(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    name = models.CharField(max_length=255)
    abbrev = models.CharField(max_length=255)
    # Store chapter logos in media/chapter_logos/ directory. Need to also include default logo for when chapter does not provide one.
    logo = models.ImageField(upload_to='chapter_logos/', null=True, blank=True, default='chapter_logos/default.png')
    location = models.CharField(max_length=255)
    desc = models.TextField(max_length=5000)
    email = models.EmailField(max_length=255)
    colour = ColorField(default=random_color, unique=True, editable=True)  # lambda function used to generate new random color
