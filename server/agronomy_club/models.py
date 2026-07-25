from django.db import models  # noqa
from colorfield.fields import ColorField  # noqa
import datetime  # noqa
from django.core.validators import MaxValueValidator, MinValueValidator, FileExtensionValidator  # noqa

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


# Enums for Chapter Membersips model's role and position
class Role(models.TextChoices):
    MEMBER = 'member', 'Member'
    ADMIN = 'admin', 'Admin'
    OWNER = 'owner', 'Owner'


class Position(models.TextChoices):
    PRESIDENT = 'pres', 'President'
    VICE_PRESIDENT = 'vpres', 'Vice President'
    SECRETARY = 'sec', 'Secretary'
    TREASURER = 'treas', 'Treasurer'
    MARKETING_OFFICER = 'mark', 'Marketing Officer'
    OCM = 'ocm', 'Ordinary Comittee Member'
    __empty__ = 'Unspecified'


class Chapters(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    name = models.CharField(max_length=100, unique=True)
    abbrev = models.CharField(max_length=10, unique=True)
    # Store chapter logos in media/chapter_logos/ directory.
    logo = models.ImageField(upload_to='chapter_logos/', null=True, blank=True)
    location = models.CharField(max_length=100)
    desc = models.TextField(max_length=150)
    email = models.EmailField(max_length=255, unique=True)
    colour = ColorField(default=random_color, unique=True, editable=True)  # lambda function used to generate new random color

    def __str__(self):
        return str(self.name)

    # Custom unique logo validation, excluding empty string and null
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['logo'],
                condition=~models.Q(logo__isnull=True) & ~models.Q(logo=''),
                name='unique_logo_except_null'
            )
        ]


class Event(models.Model):
    """ Model for events information such as title, description, location, date, thumbnail and chapter."""
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    date = models.DateTimeField()
    thumbnail = models.ImageField(upload_to="event_thumbnails/", null=True, blank=True)
    chapter = models.ForeignKey(Chapters, on_delete=models.CASCADE, related_name="events")
    link = models.URLField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.title} - {self.chapter}"


class Quiz(models.Model):
    name = models.CharField(max_length=100)
    public = models.BooleanField()
    chapter = models.ForeignKey(Chapters, on_delete=models.CASCADE)
    upload_date = models.DateTimeField(auto_now_add=True)
    quiz_data = models.FileField(upload_to='quiz_data/', blank=False, null=False, validators=[FileExtensionValidator(allowed_extensions=['json'])])

    def __str__(self):
        return f"{self.name} - {self.chapter}"


# Resource type tags for filter
class ResourceTypeTag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    lucide_name = models.CharField(max_length=100)

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
    # Create a path for stored photos
    def create_photo_path(instance, filename):
        return f'users/{instance.grad_yr}/{filename}'

    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    full_name = models.CharField(max_length=100)
    grad_yr = models.PositiveIntegerField(validators=[MinValueValidator(1900), max_value_curr_year])
    discipline = models.CharField(max_length=30)
    email = models.EmailField(max_length=255, unique=True)
    global_role = models.CharField(max_length=100, choices=[('admin', 'Admin'), ('alumni', 'Alumni'), ('user', 'User')], default='user')
    photo = models.ImageField(null=True, blank=True, upload_to=create_photo_path)

    def __str__(self):
        return f"{self.full_name} - {self.global_role}"


class ChapterMemberships(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='user_memberships')
    chapter_role = models.CharField(max_length=100, choices=Role, default=Role.MEMBER)
    chapter_id = models.ForeignKey(Chapters, on_delete=models.CASCADE, related_name='chapter_memberships')
    position = models.CharField(max_length=100, choices=Position, default=Position.__empty__, blank=True)

    def __str__(self):
        return f"{self.user_id.full_name} - {self.chapter_id.name} - {self.chapter_role}"

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=models.Q(chapter_role__in=Role),
                name='valid_role'
            ),
            models.CheckConstraint(
                condition=models.Q(position__in=Position) | models.Q(position=''),
                name='valid_position'
            ),
            models.UniqueConstraint(
                fields=['user_id', 'chapter_id'],
                name='unique_user_chapter'
            ),
            models.UniqueConstraint(
                fields=['chapter_id', 'position'],
                condition=~models.Q(position__in=[Position.OCM, Position.MARKETING_OFFICER, '']),
                name='unique_chapter_position'
            ),
            models.CheckConstraint(
                condition=~models.Q(chapter_role=Role.MEMBER) | models.Q(position=''),
                name='member_cant_have_position'
            ),
            models.CheckConstraint(
                condition=models.Q(position__in=Position) | models.Q(chapter_role=Role.MEMBER),
                name='owner_admin_must_have_position'
            )
        ]
