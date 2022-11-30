from django.urls import path

from authentication.views import (
    RegisterView,
    LoginAPIView,
    AuthUserAPIView,
    ListUser,
    DetailUserAPIView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("me/", AuthUserAPIView.as_view(), name="user"),
    path("", ListUser().as_view(), name="list"),
    path("<int:id>/", DetailUserAPIView().as_view(), name="detail"),
]
