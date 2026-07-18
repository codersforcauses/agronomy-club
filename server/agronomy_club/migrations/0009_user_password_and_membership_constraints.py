# Generated manually to avoid interactive rename prompts.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agronomy_club", "0008_alter_chapters_abbrev_alter_chapters_email_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="users",
            name="password_hash",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AlterField(
            model_name="chaptermemberships",
            name="position",
            field=models.CharField(
                blank=True,
                choices=[
                    ("pres", "President"),
                    ("vpres", "Vice President"),
                    ("sec", "Secretary"),
                    ("treas", "Treasurer"),
                    ("mark", "Marketing Officer"),
                    ("ocm", "Ordinary Committee Member"),
                ],
                default="",
                max_length=100,
            ),
        ),
        migrations.AddConstraint(
            model_name="chaptermemberships",
            constraint=models.UniqueConstraint(
                fields=("user_id", "chapter_id"),
                name="unique_user_membership_per_chapter",
            ),
        ),
    ]
