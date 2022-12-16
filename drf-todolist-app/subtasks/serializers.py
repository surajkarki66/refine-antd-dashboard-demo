from rest_framework.serializers import ModelSerializer

from subtasks.models import SubTask

class SubTaskSerializer(ModelSerializer):
    
    class Meta:
        model = SubTask
        fields = (
            "id",
            "title",
            "is_completed",
            "todo",
            "created_at",
            "updated_at",
        )
