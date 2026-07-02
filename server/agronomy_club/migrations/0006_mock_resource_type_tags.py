from django.db import migrations

# Light, saturated colours chosen to stay legible on a dark green background.
RESOURCE_TYPE_TAGS = [
    {"name": "Guide", "color": "#FFD54F"},
    {"name": "Template", "color": "#4FC3F7"},
    {"name": "Calculator", "color": "#BA68C8"},
    {"name": "Dashboard", "color": "#4DD0E1"},
    {"name": "Video", "color": "#FF8A65"},
    {"name": "Lecture Deck", "color": "#FFB74D"},
    {"name": "Data Sheet", "color": "#9575CD"},
    {"name": "Lab Protocol", "color": "#F06292"},
    {"name": "Case Study", "color": "#AED581"},
]


def seed_resource_type_tags(apps, schema_editor):
    ResourceTypeTag = apps.get_model("agronomy_club", "ResourceTypeTag")
    for tag in RESOURCE_TYPE_TAGS:
        ResourceTypeTag.objects.get_or_create(
            name=tag["name"],
            defaults={"color": tag["color"]},
        )


def unseed_resource_type_tags(apps, schema_editor):
    ResourceTypeTag = apps.get_model("agronomy_club", "ResourceTypeTag")
    ResourceTypeTag.objects.filter(
        name__in=[tag["name"] for tag in RESOURCE_TYPE_TAGS]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("agronomy_club", "0005_users"),
    ]
    operations = [
        migrations.RunPython(seed_resource_type_tags, unseed_resource_type_tags),
    ]
