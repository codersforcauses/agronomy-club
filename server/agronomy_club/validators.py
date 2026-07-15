import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


class StrongPasswordValidator:
    """
    Validates that a password meets industry-standard strength requirements:
    - At least one uppercase letter (A-Z)
    - At least one lowercase letter (a-z)
    - At least one digit (0-9)
    - At least one special character
    """

    SPECIAL_CHARACTERS = r"!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~"

    def validate(self, password, user=None):
        errors = []

        if not re.search(r"[A-Z]", password):
            errors.append(
                ValidationError(
                    _("Password must contain at least one uppercase letter."),
                    code="password_no_upper",
                )
            )

        if not re.search(r"[a-z]", password):
            errors.append(
                ValidationError(
                    _("Password must contain at least one lowercase letter."),
                    code="password_no_lower",
                )
            )

        if not re.search(r"\d", password):
            errors.append(
                ValidationError(
                    _("Password must contain at least one digit."),
                    code="password_no_digit",
                )
            )

        if not re.search(rf"[{self.SPECIAL_CHARACTERS}]", password):
            errors.append(
                ValidationError(
                    _("Password must contain at least one special character (!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)."),
                    code="password_no_special",
                )
            )

        if errors:
            raise ValidationError(errors)

    def get_help_text(self):
        return _(
            "Your password must contain at least one uppercase letter, one lowercase letter, "
            "one digit, and one special character (!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)."
        )
