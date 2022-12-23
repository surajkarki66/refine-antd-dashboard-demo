from django.shortcuts import render
from .models import User
from rest_framework.generics import (
    GenericAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    DestroyAPIView
)
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework import filters
from authentication.jwtauthenticate import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from authentication.serializers import (
    LoginSerializer,
    RegisterSerializer,
    UserSerializer,
)


class ListUser(ListAPIView):
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
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
        "is_active": ["exact"],
    }
    search_fields = ["username", "email"]
    ordering_fields = ["id", "email", "username", "created_at", "updated_at"]

    def get_queryset(self):
        return User.objects.all()


class DetailUserAPIView(RetrieveAPIView):
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    lookup_field = "id"

    def get_queryset(self):
        return User.objects.all()

class UpdateUserAPIView(UpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    lookup_field = "id"

    def get_queryset(self):
        return User.objects.all()

class DeleteUserAPIView(DestroyAPIView):
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    lookup_field = "id"

    def get_queryset(self):
        return User.objects.all()


class AuthUserAPIView(GenericAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = RegisterSerializer(user)
        return Response({"user": serializer.data})


class RegisterView(GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request):

        email = request.data.get("email", None)
        password = request.data.get("password", None)

        user = authenticate(username=email, password=password)

        if user:
            serializer = self.serializer_class(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"message": "Invalid credentials, try again..."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
