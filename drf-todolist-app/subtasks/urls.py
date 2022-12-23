from django.urls import path

# from todos.views import CreateTodoAPIView, ListTodoAPIView
from subtasks.views import ListSubtaskAPIView, CreateSubtaskAPIView, DetailSubtaskAPIView, UpdateSubtaskAPIView, DeleteSubtaskAPIView

urlpatterns = [
    path("", ListSubtaskAPIView.as_view(), name="subtasks"),
    path("create/", CreateSubtaskAPIView.as_view(), name="create"),
    path("<int:id>/", DetailSubtaskAPIView.as_view(), name="detail"),
    path("update/<int:id>/", UpdateSubtaskAPIView.as_view(), name="update"),
    path("delete/<int:id>/", DeleteSubtaskAPIView.as_view(), name="delete"),
]
