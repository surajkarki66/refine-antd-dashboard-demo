# from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from authentication.jwtauthenticate import JWTAuthentication
from todos.serializers import TodoSerializer
from todos.models import Todo
from django_filters.rest_framework import DjangoFilterBackend


class ListCreateTodoAPIView(ListCreateAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
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
        return serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Todo.objects.filter()


class DetailTodoAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    lookup_field = "id"

    def get_queryset(self):
        return Todo.objects.filter(owner=self.request.user)
