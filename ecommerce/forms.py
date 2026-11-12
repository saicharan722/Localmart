import re

from django import forms
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class CustomerPasswordResetRequestForm(forms.Form):
    email = forms.EmailField(
        label="Email address",
        max_length=254,
        widget=forms.EmailInput(attrs={
            "class": "form-control",
            "placeholder": "Enter your registered email address",
            "autocomplete": "email",
            "required": True,
        }),
    )


class CustomerSetPasswordForm(SetPasswordForm):
    def __init__(self, user, *args, **kwargs):
        super().__init__(user, *args, **kwargs)
        self.fields["new_password1"].widget.attrs.update({
            "class": "form-control", "id": "customerNewPassword", "autocomplete": "new-password",
        })
        self.fields["new_password2"].widget.attrs.update({
            "class": "form-control", "id": "customerConfirmPassword", "autocomplete": "new-password",
        })

    def clean_new_password2(self):
        password1 = self.cleaned_data.get("new_password1")
        password = self.cleaned_data.get("new_password2")
        if password1 and password and password1 != password:
            raise ValidationError("The two password fields didn’t match.", code="password_mismatch")
        if password:
            # Do the checks here instead of calling a parent clean method. Django's
            # SetPasswordForm implementation differs across supported versions.
            validate_password(password, self.user)
            requirements = (
                (len(password) >= 8, "Use at least 8 characters."),
                (bool(re.search(r"[A-Z]", password)), "Include an uppercase letter."),
                (bool(re.search(r"[a-z]", password)), "Include a lowercase letter."),
                (bool(re.search(r"\d", password)), "Include a number."),
                (bool(re.search(r"[^A-Za-z0-9]", password)), "Include a special character."),
            )
            errors = [message for valid, message in requirements if not valid]
            if errors:
                raise ValidationError(errors)
        return password
