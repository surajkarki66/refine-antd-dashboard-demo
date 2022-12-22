from django.db import models

from helpers.models import TrackingModel

class Tag(TrackingModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name