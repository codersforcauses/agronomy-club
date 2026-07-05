from django.db import models  # noqa
from colorfield.fields import ColorField  # noqa
import datetime  # noqa
from django.core.validators import MaxValueValidator, MinValueValidator  # noqa
from django import forms

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


# Validators for graduation year
def current_year():
    return datetime.date.today().year


def max_value_curr_year(value):
    return MaxValueValidator(current_year() + 12)(value)


class Chapters(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    name = models.CharField(max_length=255, unique=True)
    abbrev = models.CharField(max_length=255, unique=True)
    # Store chapter logos in media/chapter_logos/ directory. When no logo is uploaded, default to chapter_logos/<name>.png (set in save()).
    logo = models.ImageField(upload_to='chapter_logos/', null=True, blank=True, unique=True)
    location = models.CharField(max_length=255)
    desc = models.TextField(max_length=5000)
    email = models.EmailField(max_length=255, unique=True)
    colour = ColorField(default=random_color, unique=True, editable=True)  # lambda function used to generate new random color

    def __str__(self):
        return str(self.name)

    # Default the logo path to chapter_logos/<name>.png when none is provided.
    def save(self, *args, **kwargs):
        if not self.logo:
            self.logo = f'chapter_logos/{self.name}.png'
        return super().save(*args, **kwargs)


class Event(models.Model):
    """ Model for events information such as title, description, location, date, thumbnail and chapter."""
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    date = models.DateTimeField()
    thumbnail = models.ImageField(upload_to="event_thumbnails/", null=True, blank=True)
    chapter = models.ForeignKey(Chapters, on_delete=models.CASCADE, related_name="events")

    def __str__(self):
        return f"{self.title} - {self.chapter}"


class Quiz(models.Model):
    name = models.CharField(max_length=100)
    public = models.BooleanField()
    chapter = models.ForeignKey(Chapters, on_delete=models.CASCADE)
    upload_date = models.DateTimeField(auto_now_add=True)
    quiz_data = models.JSONField()

    def __str__(self):
        return f"{self.name} - {self.chapter}"


# Resource type tags for filter
class ResourceTypeTag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    color = ColorField(default=random_color, unique=True, editable=True)

    def __str__(self):
        return str(self.name)


class Resource(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    chapter = models.ForeignKey(Chapters, on_delete=models.CASCADE, related_name="resources")
    name = models.CharField(max_length=100)
    link = models.URLField(max_length=255)
    upload_date = models.DateTimeField(auto_now_add=True)
    type_tags = models.ManyToManyField(ResourceTypeTag, blank=True, related_name="resources")

    def __str__(self):
        return f"{self.name} - {self.chapter}"


class Users(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    full_name = models.CharField(max_length=100)
    grad_yr = models.PositiveIntegerField(validators=[MinValueValidator(1900), max_value_curr_year])
    discipline = models.CharField(max_length=100)
    email = models.EmailField(max_length=255, unique=True)
    global_role = models.CharField(max_length=100, choices=[('admin', 'Admin'), ('alumni', 'Alumni'), ('user', 'User')], default='user')

    def __str__(self):
        return f"{self.full_name} - {self.global_role}"


class ChapterMemberships(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='user_memberships')
    chapter_role = models.CharField(max_length=100, choices=[('member', 'Member'), ('admin', 'Admin'), ('owner', 'Owner')], default='member')
    chapter_id = models.ForeignKey(Chapters, on_delete=models.CASCADE, related_name='chapter_memberships')
    position = models.CharField(max_length=100, choices=[('pres', 'President'), ('vpres', 'Vice President'),
                                                         ('sec', 'Secretary'), ('treas', 'Treasurer'), ('mark', 'Marketing Officer'),
                                                         ('ocm', 'Ordinary Committee Member')], default='pres', blank=True)

    def __str__(self):
        return f"{self.user_id.full_name} - {self.chapter_id.name} - {self.chapter_role}"

    # runs after a change to an object is submitted on the dashboard, performing validation checks
    # it has been overridden to include more validation for the different chapter roles
    # admins and owners must have a valid position, whereas members cannot have a position
    def clean(self):
        super().clean()
        if self.chapter_role not in ('admin', 'owner'):
            if self.chapter_role != 'member':
                raise forms.ValidationError("Invalid Chapter Role")
            if self.position != '':
                raise forms.ValidationError("Chapter Members cannot have a Committee Position. They must be an Admin or Owner to have one.")
            self.position = ''
        else:
            if self.position not in ('pres', 'vpres', 'sec', 'treas', 'mark', 'ocm'):
                raise forms.ValidationError("Invalid Chapter Committee Position. A chapter Admin or Owner must have a valid Committee role.")
        return super().clean()

    # runs after clean() and immediately before the database is written to, in essence the 'last line of defense' for validation checks
    # has been overridden to include sanitisation of the position field as a last check
    def save(self):
        if self.chapter_role not in ('admin', 'owner'):
            self.position = ''
        else:
            if self.position not in ('pres', 'vpres', 'sec', 'treas', 'mark', 'ocm'):
                raise forms.ValidationError("Invalid Chapter Committee Position. A chapter Admin or Owner must have a valid Committee role.")
        return super().save()
