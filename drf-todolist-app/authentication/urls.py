from django.urls import path

from authentication.views import (
    RegisterView,
    LoginAPIView,
    AuthUserAPIView,
    ListUser,
    DeleteUserAPIView,
    UpdateUserAPIView,
    DetailUserAPIView,
    CheckPermission
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("me/", AuthUserAPIView.as_view(), name="user"),
    path("", ListUser.as_view(), name="list"),
    path("check-permission/", CheckPermission.as_view(), name="check-permission"),
    path("<int:id>/", DetailUserAPIView.as_view(), name="detail"),
    path("update/<int:id>/", UpdateUserAPIView.as_view(), name="update"),
    path("delete/<int:id>/", DeleteUserAPIView.as_view(), name="delete"),
]
