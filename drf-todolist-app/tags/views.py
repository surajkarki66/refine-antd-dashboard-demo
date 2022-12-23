from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import filters
from authentication.jwtauthenticate import JWTAuthentication
from tags.serializers import TagSerializer
from tags.models import Tag
import datetime
from django_filters.rest_framework import DjangoFilterBackend



class CreateTagAPIView(CreateAPIView):
    serializer_class = TagSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,]

    def perform_create(self, serializer):
        return serializer.save()


class ListTagAPIView(ListAPIView):
    serializer_class = TagSerializer
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
        "name": ["in", "exact"],
    }
    search_fields = ["id", "name"]
    ordering_fields = ["id", "name", "created_at", "updated_at"]

    def get_queryset(self):
        return Tag.objects.filter()


class DetailTagAPIView(RetrieveAPIView):
    serializer_class = TagSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = "id"

    def get_queryset(self):
        return Tag.objects.filter()

class UpdateTagAPIView(UpdateAPIView):
    serializer_class = TagSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = "id"

    def get_queryset(self):
        return Tag.objects.filter()

class DeleteTagAPIView(DestroyAPIView):
    serializer_class = TagSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    lookup_field = "id"

    def get_queryset(self):
        return Tag.objects.filter()


