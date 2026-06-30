import datetime
from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.db import transaction
from django.test import SimpleTestCase, TestCase
from django.utils import timezone

from agronomy_club.models import Chapters, Event, Users, max_value_curr_year


class UserModelSmokeTests(TestCase):
    def tearDown(self):
        Users.objects.all().delete()
        super().tearDown()

    def test_can_create_and_read_user(self):
        user = Users.objects.create(
            full_name="Ada Lovelace",
            grad_yr=2030,
            discipline="Agronomy",
            email="ada@example.com",
        )

        saved_user = Users.objects.get(pk=user.pk)

        self.assertEqual(saved_user.full_name, "Ada Lovelace")
        self.assertEqual(saved_user.email, "ada@example.com")
        self.assertEqual(saved_user.global_role, "user")
        self.assertEqual(str(saved_user), "Ada Lovelace - user")

    def test_rejects_duplicate_email(self):
        Users.objects.create(
            full_name="Ada Lovelace",
            grad_yr=2030,
            discipline="Agronomy",
            email="ada@example.com",
            global_role="user",
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Users.objects.create(
                    full_name="Grace Hopper",
                    grad_yr=2031,
                    discipline="Soil Science",
                    email="ada@example.com",
                    global_role="admin",
                )

    def test_rejects_invalid_graduation_year_on_clean(self):
        user = Users(
            full_name="Bad Year",
            grad_yr=1899,
            discipline="Agronomy",
            email="bad-year@example.com",
            global_role="user",
        )

        with self.assertRaises(ValidationError):
            user.full_clean()


class EventModelSmokeTests(TestCase):
    def setUp(self):
        self.chapter = Chapters.objects.create(
            name="Perth Chapter",
            abbrev="PER",
            location="Perth",
            desc="A test chapter for event model tests.",
            email="perth@agronomyclub.example",
            colour="#aabbcc",
        )
        naive_dt = datetime.datetime(2026, 6, 15, 14, 0)
        self.event_datetime = timezone.make_aware(
            naive_dt,
            timezone.get_default_timezone(),
        )
        image_file = SimpleUploadedFile(
            "test_event.jpg",
            b"dummy image data",
            content_type="image/jpeg",
        )
        self.event = Event.objects.create(
            title="Field Day",
            description="Annual field day event.",
            location="UWA Farm Ridgefield",
            date=self.event_datetime,
            thumbnail=image_file,
            chapter=self.chapter,
        )

    def test_can_create_and_read_event(self):
        saved_event = Event.objects.get(pk=self.event.pk)

        self.assertEqual(saved_event.title, "Field Day")
        self.assertEqual(saved_event.description, "Annual field day event.")
        self.assertEqual(saved_event.location, "UWA Farm Ridgefield")
        self.assertEqual(saved_event.chapter, self.chapter)
        self.assertEqual(str(saved_event), "Field Day - Perth Chapter")

    def test_event_date_is_datetime(self):
        saved_event = Event.objects.get(pk=self.event.pk)
        self.assertIsInstance(saved_event.date, datetime.datetime)

    def test_event_datetime_matches(self):
        saved_event = Event.objects.get(pk=self.event.pk)
        self.assertEqual(saved_event.date, self.event_datetime)

    def test_thumbnail_is_saved_in_correct_folder(self):
        self.assertTrue(self.event.thumbnail.name.startswith("event_thumbnails/"))

    def test_event_belongs_to_chapter(self):
        self.assertIn(self.event, self.chapter.events.all())


class UserModelMockUnitTests(SimpleTestCase):
    @patch("agronomy_club.models.current_year", return_value=2035)
    def test_max_value_curr_year_uses_current_year_helper(self, mocked_current_year):
        max_value_curr_year(2047)

        mocked_current_year.assert_called_once_with()

    @patch("agronomy_club.models.current_year", return_value=2035)
    def test_max_value_curr_year_rejects_year_beyond_window(self, mocked_current_year):
        with self.assertRaises(ValidationError):
            max_value_curr_year(2048)

        mocked_current_year.assert_called_once_with()
