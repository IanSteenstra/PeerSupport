from __future__ import unicode_literals
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.utils.translation import gettext as _
from profile.models import Profile

# Essentially an object that references the Django Models and creates an event that is used for
# holding information regarding a scheduled therapy event
# Django Model: https://docs.djangoproject.com/en/3.0/topics/db/models/


class Event(models.Model):
    name = models.CharField(
        u'Name of Event', max_length=200, help_text=u'Name of Event', null=False, blank=False)
    start_time = models.DateTimeField(
        u'Starting Time', help_text=u'Starting Time', default=now)
    end_time = models.DateTimeField(
        u'Ending Time', help_text=u'Ending Time', default=now)
    description = models.TextField(
        u'Description', help_text=u'Description', blank=True, null=True)
    # List of participants for the event
    users = models.ManyToManyField(
        Profile, related_name='Users', blank=True)
    # Creation Timestamp
    created = models.DateTimeField(auto_now_add=True)

    # Meta: Allows you to change the name of the event (how it is displayed in the admin page)
    class Meta:
        verbose_name = u'Event'
        verbose_name_plural = u'Manage Events'

    # str: The string representation of the Event object
    def __str__(self):
        return self.name

    # conflicts: Ensures that no two events can happen at the same time
    def conflicts(self, start1, end1, start2, end2):
        return max(start1, start2) < min(end1, end2)

    # get_absolute_url: Generates a change URL for each individual object
    # NOTE: Unsure if this is being called
    # TODO: Determine if this is being called
    def get_absolute_url(self):
        url = reverse(
            'admin:%s_%s_change' % (
                self._meta.app_label,
                self._meta.model_name),
            args=[self.id])
        return u'<a href="%s">%s</a>' % (url, str(self.start_time))

    # clean: General function for making sure the event is valid
    # Throws an error when the event times are invalid
    def clean(self):
        if self.end_time <= self.start_time:
            raise ValidationError(('Ending time must be after starting time'))

        events = Event.objects.all()
        if events.exists():
            for event in events:
                if self != event and self.conflicts(event.start_time, event.end_time, self.start_time, self.end_time):
                    raise ValidationError((
                        'There is an overlap with another event: ' + str(event.name) + ', ' + str(
                            event.start_time) + '-' + str(event.end_time)))
