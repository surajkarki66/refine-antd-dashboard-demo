from rest_framework.serializers import ModelSerializer
from todos.models import Todo


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            "id",
            "title",
            "desc",
            "is_completed",
            "owner",
            "created_at",
            "updated_at",
        )

class SubTaskSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            "id",
            "title",
            "is_completed",
            "todo",
            "created_at",
            "updated_at",
        )
