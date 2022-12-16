from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import filters
from authentication.jwtauthenticate import JWTAuthentication
from subtasks.serializers import SubTaskSerializer
from subtasks.models import SubTask
import datetime
from django_filters.rest_framework import DjangoFilterBackend



class ListCreateSubtaskAPIView(ListCreateAPIView):
    serializer_class = SubTaskSerializer
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
        "todo": ["exact"],
    }
    search_fields = ["id", "title"]
    ordering_fields = ["id", "title", "created_at", "updated_at", "todo"]

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        return SubTask.objects.filter()


class DetailSubtaskAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = SubTaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = "id"

    def get_queryset(self):
        return SubTask.objects.filter()


