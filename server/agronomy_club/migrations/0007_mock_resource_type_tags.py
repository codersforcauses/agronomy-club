from django.db import migrations

# Light, saturated colours chosen to stay legible on a dark green background.
RESOURCE_TYPE_TAGS = [
    {"name": "Guide"},
    {"name": "Template"},
    {"name": "Calculator"},
    {"name": "Video"},
    {"name": "Lecture Deck"},
    {"name": "Data Sheet"},
    {"name": "Lab Protocol"},
    {"name": "Case Study"},
    {"name": "Video Game"},
    {"name": "Simulation"},
    {"name": "DataBase"},
    {"name": "Article"},
    {"name": "Tool/Software"},
    {"name": "Website"},

]


def seed_resource_type_tags(apps, schema_editor):
    ResourceTypeTag = apps.get_model("agronomy_club", "ResourceTypeTag")
    for tag in RESOURCE_TYPE_TAGS:
        ResourceTypeTag.objects.get_or_create(name=tag["name"])


def unseed_resource_type_tags(apps, schema_editor):
    ResourceTypeTag = apps.get_model("agronomy_club", "ResourceTypeTag")
    ResourceTypeTag.objects.filter(
        name__in=[tag["name"] for tag in RESOURCE_TYPE_TAGS]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("agronomy_club", "0006_chaptermemberships"),
    ]
    operations = [
        migrations.RunPython(seed_resource_type_tags, unseed_resource_type_tags),
    ]
