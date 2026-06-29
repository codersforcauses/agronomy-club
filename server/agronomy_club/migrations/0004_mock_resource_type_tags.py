from django.db import migrations

RESOURCE_TYPE_TAGS = [
    {"name": "Guide", "color": "#2E7D32"},
    {"name": "Template", "color": "#1565C0"},
    {"name": "Calculator", "color": "#6A1B9A"},
    {"name": "Dashboard", "color": "#00838F"},
    {"name": "Video", "color": "#C62828"},
    {"name": "Lecture Deck", "color": "#EF6C00"},
    {"name": "Data Sheet", "color": "#4527A0"},
    {"name": "Lab Protocol", "color": "#9E9E9E"},
    {"name": "Case Study", "color": "#000000"},
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
        ("agronomy_club", "0003_resourcetypetag_resource"),
    ]
    operations = [
        migrations.RunPython(seed_resource_type_tags, unseed_resource_type_tags),
    ]
