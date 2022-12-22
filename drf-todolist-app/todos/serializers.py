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
            "tags",
            "created_at",
            "updated_at",
        )
        depth = 0

class TodoDetailsSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            "id",
            "title",
            "desc",
            "is_completed",
            "owner",
            "tags",
            "created_at",
            "updated_at",
        )
        depth = 1

