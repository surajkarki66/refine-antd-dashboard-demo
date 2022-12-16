from django.urls import path

# from todos.views import CreateTodoAPIView, ListTodoAPIView
from subtasks.views import ListCreateSubtaskAPIView,DetailSubtaskAPIView

urlpatterns = [
    path("", ListCreateSubtaskAPIView.as_view(), name="subtasks"),
    path("<int:id>/", DetailSubtaskAPIView.as_view(), name="detail"),
]
