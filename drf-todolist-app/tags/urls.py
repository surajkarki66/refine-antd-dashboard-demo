from django.urls import path

from tags.views import ListCreateTagAPIView, DetailTagAPIView

urlpatterns = [
    path("", ListCreateTagAPIView.as_view(), name="tags"),
    path("<int:id>/", DetailTagAPIView.as_view(), name="detail"),
]
