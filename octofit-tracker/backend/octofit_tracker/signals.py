from django.db.models.signals import post_migrate
from django.dispatch import receiver
from djongo import models
from .models import User
from django.conf import settings
from pymongo import MongoClient

@receiver(post_migrate)
def ensure_user_email_unique_index(sender, **kwargs):
    if sender.name == 'octofit_tracker':
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        db.users.create_index('email', unique=True)
