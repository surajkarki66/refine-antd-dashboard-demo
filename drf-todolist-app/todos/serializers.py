from rest_framework.serializers import ModelSerializer
from todos.models import Todo
from tags.models import Tag


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id",
                  "title",
                  "desc",
                  "is_completed",
                  "owner",
                  "tags",
                  "province",
                  "district",
                  "created_at",
                  "updated_at",]

    def create(self, validated_data):
        tags = validated_data.pop("tags")
        new_todo = Todo.objects.create(**validated_data)
        
        for tag in tags:
            tag_obj = Tag.objects.get(id=tag.id)
            new_todo.tags.add(tag_obj)

        return new_todo

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.desc = validated_data.get('desc', instance.desc)
        instance.is_completed = validated_data.get('is_completed', instance.is_completed)
        instance.owner = validated_data.get('owner', instance.owner)
        instance.province = validated_data.get('province', instance.province)
        instance.district = validated_data.get('district', instance.district)

        tags = validated_data.get('tags', instance.tags)

        for tag in tags:
            tag_obj = Tag.objects.get(id=tag.id)
            instance.tags.add(tag_obj)

        instance.save()
        
        return instance


class TodoListSerializer(TodoSerializer):
    class Meta:
        model = Todo
        fields = (
            "id",
            "title",
            "desc",
            "is_completed",
            "owner",
            "tags",
            "province",
            "district",
            "created_at",
            "updated_at",
        )

        depth = 1


class TodoDetailSerializer(TodoSerializer):
    class Meta:
        model = Todo
        fields = (
            "id",
            "title",
            "desc",
            "is_completed",
            "owner",
            "tags",
            "province",
            "district",
            "created_at",
            "updated_at",
        )

        depth = 1
