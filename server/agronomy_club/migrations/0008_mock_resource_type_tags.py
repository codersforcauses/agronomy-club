from django.db import migrations

# Light, saturated colours chosen to stay legible on a dark green background.
RESOURCE_TYPE_TAGS = [
    {"name": "Guide", "lucide_name": "compass"},
    {"name": "Template", "lucide_name": "layout-template"},
    {"name": "Calculator", "lucide_name": "calculator"},
    {"name": "Video", "lucide_name": "video"},
    {"name": "Lecture Deck", "lucide_name": "presentation"},
    {"name": "Data Sheet", "lucide_name": "file-spreadsheet"},
    {"name": "Lab Protocol", "lucide_name": "flask-conical"},
    {"name": "Case Study", "lucide_name": "file-search"},
    {"name": "Video Game", "lucide_name": "gamepad-2"},
    {"name": "Simulation", "lucide_name": "boxes"},
    {"name": "DataBase", "lucide_name": "database"},
    {"name": "Article", "lucide_name": "file-text"},
    {"name": "Tool/Software", "lucide_name": "wrench"},
    {"name": "Website", "lucide_name": "globe"}

]


def seed_resource_type_tags(apps, schema_editor):
    ResourceTypeTag = apps.get_model("agronomy_club", "ResourceTypeTag")
    for tag in RESOURCE_TYPE_TAGS:
        ResourceTypeTag.objects.get_or_create(name=tag["name"], lucide_name=tag["lucide_name"])


def unseed_resource_type_tags(apps, schema_editor):
    ResourceTypeTag = apps.get_model("agronomy_club", "ResourceTypeTag")
    ResourceTypeTag.objects.filter(
        name__in=[tag["name"] for tag in RESOURCE_TYPE_TAGS]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("agronomy_club", "0007_remove_resourcetypetag_color_and_more"),
    ]
    operations = [
        migrations.RunPython(seed_resource_type_tags, unseed_resource_type_tags),
    ]
