from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.db import transaction
from django.test import SimpleTestCase, TestCase, override_settings
from django.utils import timezone
from django.urls import reverse
from django.conf import settings
from rest_framework.test import APITestCase
from datetime import datetime
from io import BytesIO
from tempfile import mkdtemp
from PIL import Image
from shutil import rmtree

from agronomy_club.models import Users, max_value_curr_year, Resource, ResourceTypeTag, Chapters, Event
from agronomy_club.validators import StrongPasswordValidator


# Create a 1x1 pixel PNG
def make_test_image():
    buffer = BytesIO()
    Image.new('RGB', (1, 1)).save(buffer, format='PNG')
    buffer.seek(0)
    return SimpleUploadedFile('logo.png', buffer.read(), content_type='image/png')


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
        naive_dt = datetime(2026, 6, 15, 14, 0)
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
        self.assertIsInstance(saved_event.date, datetime)

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


class ResourceModelSmokeTests(TestCase):
    def setUp(self):
        self._existing_tag_ids = list(
            ResourceTypeTag.objects.values_list('pk', flat=True)
        )
        self.chapter = Chapters.objects.create(
            name='gamers',
            abbrev='game',
            location='Amphoreus',
            desc='we play, maybe',
            email='gamers@agronomy.club'
        )

    def tearDown(self):
        Resource.objects.all().delete()
        Chapters.objects.all().delete()
        ResourceTypeTag.objects.exclude(pk__in=self._existing_tag_ids).delete()
        super().tearDown()

    def test_can_create_and_read_resource(self):
        tag = ResourceTypeTag.objects.create(name='game')

        resource = Resource.objects.create(
            chapter=self.chapter,
            name='valorant cheat client',
            link='https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        )
        resource.type_tags.set([tag])

        saved_resource = Resource.objects.get(pk=resource.pk)

        self.assertEqual(saved_resource.name, 'valorant cheat client')
        self.assertEqual(saved_resource.link, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        self.assertEqual(str(saved_resource.chapter), 'gamers')
        self.assertEqual(str(saved_resource.type_tags.first()), 'game')
        self.assertEqual(str(saved_resource), 'valorant cheat client - gamers')

    def test_reject_duplicate_tag_name(self):
        ResourceTypeTag.objects.create(name='webpage')

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                ResourceTypeTag.objects.create(name='webpage')

    def test_reject_duplicate_tag_color(self):
        ResourceTypeTag.objects.create(
            name='webpage',
            color='#111111'
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                ResourceTypeTag.objects.create(
                    name='video',
                    color='#111111'
                )

    def test_cascade_delete_chapter_on_resource(self):
        resource = Resource.objects.create(
            chapter=self.chapter,
            name='valorant cheat client',
            link='https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        )

        self.assertEqual(Resource.objects.filter(pk=resource.pk).count(), 1)

        self.chapter.delete()

        self.assertEqual(Resource.objects.filter(pk=resource.pk).count(), 0)

    def test_multiple_resource_tags(self):
        tag1 = ResourceTypeTag.objects.create(name='game')
        tag2 = ResourceTypeTag.objects.create(name='docs')

        resource = Resource.objects.create(
            chapter=self.chapter,
            name='valorant cheat client',
            link='https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        )
        resource.type_tags.set([tag1, tag2])

        saved_resource = Resource.objects.get(pk=resource.pk)

        self.assertEqual(saved_resource.type_tags.count(), 2)
        self.assertIn(tag1, saved_resource.type_tags.all())
        self.assertIn(tag2, saved_resource.type_tags.all())

    def test_reject_invalid_resource_url(self):
        resource = Resource(
            chapter=self.chapter,
            name='valorant cheat client',
            link='bad link',
        )

        with self.assertRaises(ValidationError):
            resource.full_clean()


@override_settings(MEDIA_ROOT=mkdtemp())
class ChaptersModelSmokeTests(TestCase):
    def tearDown(self):
        Chapters.objects.all().delete()
        rmtree(settings.MEDIA_ROOT, ignore_errors=True)
        super().tearDown()

    def test_create_read_chapter_no_logo(self):
        chapter = Chapters.objects.create(
            name='gamers',
            abbrev='game',
            location='Amphoreus',
            desc='we play, maybe',
            email='gamers@agronomy.club',
            colour='#111111'
        )

        saved_chapter = Chapters.objects.get(pk=chapter.pk)

        self.assertEqual(saved_chapter.name, 'gamers')
        self.assertEqual(saved_chapter.abbrev, 'game')
        self.assertEqual(saved_chapter.logo.name, 'chapter_logos/default.png')
        self.assertEqual(saved_chapter.location, 'Amphoreus')
        self.assertEqual(saved_chapter.desc, 'we play, maybe')
        self.assertEqual(saved_chapter.email, 'gamers@agronomy.club')
        self.assertEqual(saved_chapter.colour, '#111111')
        self.assertEqual(str(saved_chapter), 'gamers')

    def test_upload_logo(self):
        chapter = Chapters.objects.create(
            name='gamers',
            abbrev='game',
            logo=make_test_image(),
            location='Amphoreus',
            desc='we play, maybe',
            email='gamers@agronomy.club',
        )

        saved_chapter = Chapters.objects.get(pk=chapter.pk)

        self.assertEqual(saved_chapter.logo.name, 'chapter_logos/logo.png')

    def test_reject_duplicate_color(self):
        Chapters.objects.create(
            name='c1',
            abbrev='c1',
            location='l1',
            desc='d1',
            email='c1@agronomy.club',
            colour='#111111'
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Chapters.objects.create(
                    name='c2',
                    abbrev='c2',
                    location='l2',
                    desc='d2',
                    email='c2@agronomy.club',
                    colour='#111111'
                )

    def test_reject_duplicate_name(self):
        Chapters.objects.create(
            name='c1',
            abbrev='c1',
            location='l1',
            desc='d1',
            email='c1@agronomy.club'
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Chapters.objects.create(
                    name='c1',
                    abbrev='c2',
                    location='l2',
                    desc='d2',
                    email='c2@agronomy.club'
                )

    def test_reject_duplicate_abbrev(self):
        Chapters.objects.create(
            name='c1',
            abbrev='c1',
            location='l1',
            desc='d1',
            email='c1@agronomy.club'
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Chapters.objects.create(
                    name='c2',
                    abbrev='c1',
                    location='l2',
                    desc='d2',
                    email='c2@agronomy.club'
                )

    def test_reject_duplicate_email(self):
        Chapters.objects.create(
            name='c1',
            abbrev='c1',
            location='l1',
            desc='d1',
            email='c1@agronomy.club'
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Chapters.objects.create(
                    name='c2',
                    abbrev='c2',
                    location='l2',
                    desc='d2',
                    email='c1@agronomy.club'
                )

    def test_reject_duplicate_logo_path(self):
        Chapters.objects.create(
            name='c1',
            abbrev='c1',
            logo='chapter_logos/logo.png',
            location='l1',
            desc='d1',
            email='c1@agronomy.club'
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Chapters.objects.create(
                    name='c2',
                    abbrev='c2',
                    logo='chapter_logos/logo.png',
                    location='l2',
                    desc='d2',
                    email='c2@agronomy.club'
                )


class ResourceAPISmokeTests(APITestCase):
    def setUp(self):
        self._existing_tag_ids = list(
            ResourceTypeTag.objects.values_list('pk', flat=True)
        )
        self.chapter = Chapters.objects.create(
            name='gamers',
            abbrev='game',
            location='Amphoreus',
            desc='we play, maybe',
            email='gamers@agronomy.club'
        )

        self.t1 = ResourceTypeTag.objects.create(name='game')
        self.t2 = ResourceTypeTag.objects.create(name='docs')
        self.t3 = ResourceTypeTag.objects.create(name='tutorial')

        self.r1 = Resource.objects.create(
            chapter=self.chapter,
            name="valorant cheat client",
            link="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        )

        self.r2 = Resource.objects.create(
            chapter=self.chapter,
            name="making nukes for babies",
            link="https://en.wikipedia.org/wiki/Nuclear_Gandhi",
        )

        self.r3 = Resource.objects.create(
            chapter=self.chapter,
            name="insert gen alpha joke here",
            link="https://skibidi.rizz:6767"
        )

        self.r1.type_tags.set([self.t1, self.t2])
        self.r2.type_tags.set([self.t2, self.t3])

        Resource.objects.filter(pk=self.r1.pk).update(
            upload_date=timezone.make_aware(datetime(1945, 8, 17))
        )

        Resource.objects.filter(pk=self.r2.pk).update(
            upload_date=timezone.make_aware(datetime(2001, 11, 9))
        )

        Resource.objects.filter(pk=self.r3.pk).update(
            upload_date=timezone.make_aware(datetime(2026, 11, 12))
        )

    def tearDown(self):
        Resource.objects.all().delete()
        Chapters.objects.all().delete()
        ResourceTypeTag.objects.exclude(pk__in=self._existing_tag_ids).delete()
        super().tearDown()

    def test_list_resources(self):
        url = reverse('resource-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_check_order_resources(self):
        url = reverse('resource-list')
        response = self.client.get(url)

        ids = [item['id'] for item in response.json()]
        self.assertEqual(ids, [self.r3.id, self.r2.id, self.r1.id])

    def test_filter_resources_with_single_tag(self):
        url = reverse('resource-list')
        response = self.client.get(url, {'tags': self.t1.id})

        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['id'], self.r1.id)

    def test_filter_resources_with_2_tag(self):
        url = reverse('resource-list')
        response = self.client.get(url, {'tags': f'{self.t1.id},{self.t2.id}'})

        self.assertEqual(len(response.json()), 2)
        ids = [item['id'] for item in response.json()]
        self.assertEqual(ids, [self.r2.id, self.r1.id])

    def test_bad_tag_filter(self):
        url = reverse('resource-list') + '?tags=hi'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_filter_nonexistent_tag(self):
        url = reverse('resource-list')
        response = self.client.get(url, {'tags': 9999})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_list_resource_tags(self):
        url = reverse('resource-type-tag-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 17)


class ChapterAPISmokeTests(APITestCase):
    def setUp(self):
        self.chapter = Chapters.objects.create(
            name='perth',
            abbrev='per',
            location='perth',
            desc='chapter description',
            email='perth@agronomy.club'
        )

    def tearDown(self):
        Chapters.objects.all().delete()
        super().tearDown()


class StrongPasswordValidatorTests(SimpleTestCase):
    def setUp(self):
        self.validator = StrongPasswordValidator()

    def test_accepts_strong_password(self):
        # Should not raise for a password meeting all requirements
        self.validator.validate("SecurePass1!")

    def test_rejects_missing_uppercase(self):
        with self.assertRaises(ValidationError) as ctx:
            self.validator.validate("securepass1!")
        codes = [e.code for e in ctx.exception.error_list]
        self.assertIn("password_no_upper", codes)

    def test_rejects_missing_lowercase(self):
        with self.assertRaises(ValidationError) as ctx:
            self.validator.validate("SECUREPASS1!")
        codes = [e.code for e in ctx.exception.error_list]
        self.assertIn("password_no_lower", codes)

    def test_rejects_missing_digit(self):
        with self.assertRaises(ValidationError) as ctx:
            self.validator.validate("SecurePassAB!")
        codes = [e.code for e in ctx.exception.error_list]
        self.assertIn("password_no_digit", codes)

    def test_rejects_missing_special_character(self):
        with self.assertRaises(ValidationError) as ctx:
            self.validator.validate("SecurePass12")
        codes = [e.code for e in ctx.exception.error_list]
        self.assertIn("password_no_special", codes)

    def test_reports_all_violations_at_once(self):
        # All-lowercase, no digit, no special character
        with self.assertRaises(ValidationError) as ctx:
            self.validator.validate("alllowercase")
        codes = [e.code for e in ctx.exception.error_list]
        self.assertIn("password_no_upper", codes)
        self.assertIn("password_no_digit", codes)
        self.assertIn("password_no_special", codes)

    def test_accepts_various_special_characters(self):
        for special in "!@#$%^&*()_+-=[]{}|;':\",./<>?":
            try:
                self.validator.validate(f"SecurePass1{special}")
            except Exception as e:
                self.fail(f"validate() raised unexpectedly for special char {special!r}: {e}")

    def test_get_help_text_returns_string(self):
        self.assertIsInstance(self.validator.get_help_text(), str)
