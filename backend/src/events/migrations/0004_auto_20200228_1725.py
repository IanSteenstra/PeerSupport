# Generated by Django 3.0.3 on 2020-02-28 22:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_event_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='created_at',
            new_name='created',
        ),
    ]