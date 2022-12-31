from rest_framework.generics import ListAPIView
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend

from authentication.jwtauthenticate import JWTAuthentication
from .serializers import ProvinceListSerializer, DistrictListSerializer
from .models import Province, District


class ListProvinceAPIView(ListAPIView):
    serializer_class = ProvinceListSerializer
    authentication_classes = [JWTAuthentication,]
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
        return Province.objects.filter()


class ListDistrictAPIView(ListAPIView):
    serializer_class = DistrictListSerializer
    authentication_classes = [JWTAuthentication,]
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
        "province": ["exact"]
    }
    search_fields = ["id", "name", "province"]
    ordering_fields = ["id", "name", "created_at", "updated_at"]

    def get_queryset(self):
        return District.objects.filter()