from distutils.archive_util import make_zipfile
from django.db import models

from helpers.models import TrackingModel
from tags.models import Tag
from provinces.models import Province, District
from authentication.models import User

class Todo(TrackingModel):
    title   = models.CharField(max_length=255)
    desc    = models.TextField()
    is_completed = models.BooleanField(default=False)
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    province = models.ForeignKey(to=Province, on_delete=models.CASCADE)
    district = models.ForeignKey(to=District, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

