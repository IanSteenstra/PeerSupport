from django.apps import AppConfig
import html
import pathlib
import os
from matching import cluster

class EventsConfig(AppConfig):
    name = 'events'
    MODEL_PATH = Path("model")
    clusters = cluster(True)
