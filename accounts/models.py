from django.conf import settings
from django.db import models


class AdminProfile(models.Model):
	user = models.OneToOneField(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="admin_profile",
	)
	mobile_number = models.CharField(max_length=30, blank=True)
	image_url = models.URLField(max_length=1000, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f"Admin profile for {self.user.get_username()}"
