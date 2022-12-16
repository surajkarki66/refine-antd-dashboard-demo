from django.db import models

from helpers.models import TrackingModel
from todos.models import Todo


class SubTask(TrackingModel):
    title   = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)
    todo = models.ForeignKey(to=Todo, on_delete=models.CASCADE)

    def __str__(self):
        return self.title