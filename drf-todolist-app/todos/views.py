import datetime
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import filters
from authentication.jwtauthenticate import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend


from todos.serializers import TodoSerializer
from todos.models import Todo
from tags.models import Tag


class ListCreateTodoAPIView(ListCreateAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # What to use to do the filter
    filterset_fields = {
        "id": ["exact"],
        "created_at": ["gte", "lte", "exact", "gt", "lt"],
        "updated_at": ["gte", "lte", "exact", "gt", "lt"],
        "is_completed": ["exact"],
        "owner": ["exact"],
    }
    search_fields = ["id", "title", "desc"]
    ordering_fields = ["id", "title", "created_at", "updated_at", "owner"]

    def perform_create(self, serializer):
        data = self.request.data
        new_todo = Todo.objects.create(title=data["title"], desc=data["desc"], owner=self.request.user)

        for tag_id in data["tags"]:
            tag_obj = Tag.objects.get(id=tag_id)
            new_todo.tags.add(tag_obj)

        return serializer.save()

    def get_queryset(self):
        return Todo.objects.filter()


class DetailTodoAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = "id"

    def perform_update(self, serializer):
        data = self.request.data
        todo_object = Todo.objects.get(id=self.kwargs["id"])

        todo_object.title = data["title"]
        todo_object.desc = data["desc"]
        todo_object.owner = self.request.user
      
        for tag_id in data["tags"]:
            tag_obj = Tag.objects.get(id=tag_id)
            todo_object.tags.add(tag_obj)

        return serializer.save()

    
    def get_queryset(self):
        return Todo.objects.filter()


class TodaysTodo(ListAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        today = datetime.datetime.today()
        start_date = datetime.datetime(year=today.year, month=today.month,
                                       day=today.day, hour=0, minute=0, second=0)  # represents 00:00:00
        end_date = datetime.datetime(year=today.year, month=today.month,
                                     day=today.day, hour=23, minute=59, second=59)  # represents 23:59:59
        qs = Todo.objects.filter(created_at__range=(
            start_date, end_date))  # today's objects
        return qs


class GetTodoByTitle(RetrieveAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    lookup_field = "title"

    def get_queryset(self):
        return Todo.objects.filter()
