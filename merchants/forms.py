from django import forms
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class MerchantPasswordResetRequestForm(forms.Form):
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


class MerchantSetPasswordForm(forms.Form):
    new_password1 = forms.CharField(
        label="New password",
        strip=False,
        widget=forms.PasswordInput(attrs={
            "class": "form-control",
            "autocomplete": "new-password",
            "id": "newPassword",
            "required": True,
        }),
    )
    new_password2 = forms.CharField(
        label="Confirm new password",
        strip=False,
        widget=forms.PasswordInput(attrs={
            "class": "form-control",
            "autocomplete": "new-password",
            "id": "confirmPassword",
            "required": True,
        }),
    )

    def __init__(self, *args, user=None, **kwargs):
        self.user = user
        super().__init__(*args, **kwargs)

    def clean(self):
        cleaned = super().clean()
        password1 = cleaned.get("new_password1")
        password2 = cleaned.get("new_password2")
        if not password1 or not password2:
            return cleaned
        if password1 != password2:
            self.add_error("new_password2", "The passwords do not match.")
            return cleaned
        if len(password1) < 8:
            self.add_error("new_password1", "Use at least 8 characters.")
        if not any(char.isupper() for char in password1):
            self.add_error("new_password1", "Include at least one uppercase letter.")
        if not any(char.islower() for char in password1):
            self.add_error("new_password1", "Include at least one lowercase letter.")
        if not any(char.isdigit() for char in password1):
            self.add_error("new_password1", "Include at least one number.")
        if not any(not char.isalnum() for char in password1):
            self.add_error("new_password1", "Include at least one special character.")
        try:
            validate_password(password1, user=self.user)
        except ValidationError as exc:
            self.add_error("new_password1", exc)
        return cleaned
