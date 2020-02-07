from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from Profile.models import Profile, UserQuiz, CounselorQuiz

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    Profile.objects.create(user=instance)
    Token.objects.create(user=instance)

@receiver(post_save, sender=Profile)
def create_user_quiz(sender, instance, created, **kwargs):
	if created:
		UserQuiz.objects.create(profile=instance)

@receiver(post_save, sender=Profile)
def create_counselor_quiz(sender, instance, created, **kwargs):
	if created:
		CounselorQuiz.objects.create(profile=instance)


