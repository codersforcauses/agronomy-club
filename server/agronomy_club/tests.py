from unittest.mock import patch
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.db import transaction
from django.test import SimpleTestCase, TestCase

from agronomy_club.models import Users, max_value_curr_year, Resource, ResourceTypeTag, Chapters


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
        ResourceTypeTag.objects.all().delete()
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

    def test_cascade_delete_chapter(self):
        resource = Resource.objects.create(
            chapter=self.chapter,
            name='valorant cheat client',
            link='https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        )

        self.assertEqual(Resource.objects.filter(pk=resource.pk).count(), 1)

        self.chapter.delete()

        self.assertEqual(Resource.objects.filter(pk=resource.pk).count(), 0)

    def test_multiple_tags(self):
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

    def test_reject_invalid_url(self):
        resource = Resource(
            chapter=self.chapter,
            name='valorant cheat client',
            link='bad link',
        )

        with self.assertRaises(ValidationError):
            resource.full_clean()
