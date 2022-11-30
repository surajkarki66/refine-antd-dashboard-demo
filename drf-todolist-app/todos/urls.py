from django.urls import path

# from todos.views import CreateTodoAPIView, ListTodoAPIView
from todos.views import ListCreateTodoAPIView, DetailTodoAPIView

urlpatterns = [
    path("", ListCreateTodoAPIView.as_view(), name="todos"),
    path("<int:id>/", DetailTodoAPIView.as_view(), name="detail"),
]
