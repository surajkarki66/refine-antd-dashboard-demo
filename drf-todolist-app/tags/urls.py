from django.urls import path

from tags.views import ListTagAPIView, CreateTagAPIView, DeleteTagAPIView, DetailTagAPIView, UpdateTagAPIView

urlpatterns = [
    path("", ListTagAPIView.as_view(), name="tags"),
    path("create/", CreateTagAPIView.as_view(), name="create"),
    path("<int:id>/", DetailTagAPIView.as_view(), name="detail"),
    path("update/<int:id>/", UpdateTagAPIView.as_view(), name="update"),
    path("delete/<int:id>/", DeleteTagAPIView.as_view(), name="delete"),
]
