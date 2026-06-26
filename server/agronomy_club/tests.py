from unittest.mock import patch

from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.db import transaction
from django.test import SimpleTestCase, TestCase

from agronomy_club.models import Users, max_value_curr_year


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
