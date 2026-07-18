from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.db import transaction
from django.test import SimpleTestCase, TestCase
from django.utils import timezone
from django.urls import reverse
from rest_framework.test import APITestCase
from datetime import datetime

from agronomy_club.models import User, max_value_curr_year, Resource, ResourceTypeTag, Chapter, Event, ChapterMemberships


class UserModelSmokeTests(TestCase):
    def tearDown(self):
        User.objects.all().delete()
        super().tearDown()

    def test_can_create_and_read_user(self):
        user = User.objects.create(
            full_name="Ada Lovelace",
            grad_yr=2030,
            discipline="Agronomy",
            email="ada@example.com",
        )

        saved_user = User.objects.get(pk=user.pk)

        self.assertEqual(saved_user.full_name, "Ada Lovelace")
        self.assertEqual(saved_user.email, "ada@example.com")
        self.assertEqual(saved_user.global_role, "user")
        self.assertEqual(str(saved_user), "Ada Lovelace - user")

    def test_rejects_duplicate_email(self):
        User.objects.create(
            full_name="Ada Lovelace",
            grad_yr=2030,
            discipline="Agronomy",
            email="ada@example.com",
            global_role="user",
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                User.objects.create(
                    full_name="Grace Hopper",
                    grad_yr=2031,
                    discipline="Soil Science",
                    email="ada@example.com",
                    global_role="admin",
                )

    def test_rejects_invalid_graduation_year_on_clean(self):
        user = User(
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
        self.chapter = Chapter.objects.create(
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
        self.chapter = Chapter.objects.create(
            name='gamers',
            abbrev='game',
            location='Amphoreus',
            desc='we play, maybe',
            email='gamers@agronomy.club'
        )

    def tearDown(self):
        Resource.objects.all().delete()
        Chapter.objects.all().delete()
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


class ResourceAPISmokeTests(APITestCase):
    def setUp(self):
        self._existing_tag_ids = list(
            ResourceTypeTag.objects.values_list('pk', flat=True)
        )
        self.chapter = Chapter.objects.create(
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
        Chapter.objects.all().delete()
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


class AuthAPITests(APITestCase):
    def test_signup_creates_normal_user(self):
        response = self.client.post(
            reverse('auth-signup'),
            {
                'full_name': 'Normal User',
                'grad_yr': 2031,
                'discipline': 'Agronomy',
                'email': 'normal@example.com',
                'password': 'StrongPass#2026',
            },
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        user = User.objects.get(email='normal@example.com')
        self.assertEqual(user.global_role, 'user')
        self.assertTrue(user.check_password('StrongPass#2026'))

    def test_signup_rejects_duplicate_email(self):
        existing = User.objects.create(
            full_name='Existing',
            grad_yr=2030,
            discipline='Agronomy',
            email='existing@example.com',
            global_role='user',
        )
        existing.set_password('StrongPass#2026')
        existing.save()

        response = self.client.post(
            reverse('auth-signup'),
            {
                'full_name': 'Another',
                'grad_yr': 2031,
                'discipline': 'Agronomy',
                'email': 'existing@example.com',
                'password': 'StrongPass#2026',
            },
            format='json',
        )

        self.assertEqual(response.status_code, 400)

    def test_login_succeeds_with_valid_credentials(self):
        user = User.objects.create(
            full_name='Login User',
            grad_yr=2030,
            discipline='Agronomy',
            email='login@example.com',
            global_role='user',
        )
        user.set_password('StrongPass#2026')
        user.save()

        response = self.client.post(
            reverse('auth-login'),
            {'email': 'login@example.com', 'password': 'StrongPass#2026'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['user']['email'], 'login@example.com')

    def test_login_rejects_invalid_credentials(self):
        user = User.objects.create(
            full_name='Login User',
            grad_yr=2030,
            discipline='Agronomy',
            email='login2@example.com',
            global_role='user',
        )
        user.set_password('StrongPass#2026')
        user.save()

        response = self.client.post(
            reverse('auth-login'),
            {'email': 'login2@example.com', 'password': 'wrong-password'},
            format='json',
        )

        self.assertEqual(response.status_code, 401)


class ChapterMembershipRequirementsTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            full_name='Member User',
            grad_yr=2030,
            discipline='Agronomy',
            email='member@example.com',
            global_role='user',
        )
        self.chapter = Chapter.objects.create(
            name='Membership Chapter',
            abbrev='MEM',
            location='Perth',
            desc='Membership test chapter',
            email='membership@agronomy.club',
            colour='#bbaa11',
        )

    def test_member_cannot_have_committee_position(self):
        membership = ChapterMemberships(
            user_id=self.user,
            chapter_id=self.chapter,
            chapter_role='member',
            position='pres',
        )

        with self.assertRaises(ValidationError):
            membership.full_clean()

    def test_admin_requires_valid_committee_position(self):
        membership = ChapterMemberships(
            user_id=self.user,
            chapter_id=self.chapter,
            chapter_role='admin',
            position='',
        )

        with self.assertRaises(ValidationError):
            membership.full_clean()

    def test_owner_with_valid_position_is_accepted(self):
        membership = ChapterMemberships.objects.create(
            user_id=self.user,
            chapter_id=self.chapter,
            chapter_role='owner',
            position='pres',
        )

        self.assertEqual(membership.chapter_role, 'owner')
        self.assertEqual(membership.position, 'pres')

    def test_unique_membership_per_user_and_chapter(self):
        ChapterMemberships.objects.create(
            user_id=self.user,
            chapter_id=self.chapter,
            chapter_role='member',
            position='',
        )

        with self.assertRaises(ValidationError):
            duplicate = ChapterMemberships(
                user_id=self.user,
                chapter_id=self.chapter,
                chapter_role='admin',
                position='pres',
            )
            duplicate.full_clean()
