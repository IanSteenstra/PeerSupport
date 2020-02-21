from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
	alias = models.CharField(max_length=20, null=True, blank=True)
	friends = models.ManyToManyField('self', blank=True)

	def __str__(self):
		return self.user.username
