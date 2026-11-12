from django import forms
from django.contrib.auth import get_user_model
from django.core.validators import URLValidator
from django.db import transaction

from .models import AdminProfile


class AdminProfileForm(forms.ModelForm):
    first_name = forms.CharField(max_length=150, required=False)
    last_name = forms.CharField(max_length=150, required=False)
    email = forms.EmailField(max_length=254)

    class Meta:
        model = AdminProfile
        fields = ("mobile_number", "image_url")
        widgets = {
            "mobile_number": forms.TextInput(attrs={"autocomplete": "tel", "inputmode": "tel"}),
            "image_url": forms.URLInput(attrs={"autocomplete": "url", "placeholder": "https://example.com/profile.jpg"}),
        }

    def __init__(self, *args, user, **kwargs):
        self.user = user
        super().__init__(*args, **kwargs)
        self.fields["first_name"].initial = user.first_name
        self.fields["last_name"].initial = user.last_name
        self.fields["email"].initial = user.email

    def clean_email(self):
        email = self.cleaned_data["email"].strip()
        user_model = get_user_model()
        if user_model.objects.filter(email__iexact=email).exclude(pk=self.user.pk).exists():
            raise forms.ValidationError("This email address is already in use.")
        return email

    def clean_mobile_number(self):
        mobile = self.cleaned_data["mobile_number"].strip()
        if mobile and not all(character.isdigit() or character in "+() -" for character in mobile):
            raise forms.ValidationError("Enter a valid phone number.")
        if sum(character.isdigit() for character in mobile) > 15:
            raise forms.ValidationError("Phone numbers cannot exceed 15 digits.")
        return mobile

    def clean_image_url(self):
        image_url = self.cleaned_data["image_url"].strip()
        if image_url:
            URLValidator(schemes=["http", "https"])(image_url)
        return image_url

    @transaction.atomic
    def save(self, commit=True):
        profile = super().save(commit=False)
        profile.user = self.user
        self.user.first_name = self.cleaned_data["first_name"].strip()
        self.user.last_name = self.cleaned_data["last_name"].strip()
        self.user.email = self.cleaned_data["email"]
        if commit:
            self.user.save(update_fields=["first_name", "last_name", "email"])
            profile.save()
        return profile