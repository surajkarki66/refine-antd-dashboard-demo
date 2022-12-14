import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, ListCreateAPIView, UpdateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import filters
from authentication.jwtauthenticate import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend


from todos.serializers import TodoSerializer, TodoDetailSerializer, TodoListSerializer
from todos.models import Todo
from tags.models import Tag
from provinces.models import Province, District


class ListTodoAPIView(ListAPIView):
    serializer_class = TodoListSerializer
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

    def get_queryset(self):
        return Todo.objects.filter()


class CreateTodoAPIView(CreateAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,]

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Todo.objects.filter()


class DetailTodoAPIView(RetrieveAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    lookup_field = "id"

    def get_queryset(self):
        return Todo.objects.filter()


class UpdateTodoAPIView(UpdateAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = "id"

    def perform_update(self, serializer):
        return serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Todo.objects.filter()


class DeleteTodoAPIView(DestroyAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = "id"

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
