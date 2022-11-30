from distutils.archive_util import make_zipfile
from django.db import models

from helpers.models import TrackingModel
from authentication.models import User

class Todo(TrackingModel):
    title   = models.CharField(max_length=255)
    desc    = models.TextField()
    is_completed = models.BooleanField(default=False)
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
