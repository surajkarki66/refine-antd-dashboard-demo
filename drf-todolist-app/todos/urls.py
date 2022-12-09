from django.urls import path

# from todos.views import CreateTodoAPIView, ListTodoAPIView
from todos.views import ListCreateTodoAPIView, DetailTodoAPIView, TodaysTodo, GetTodoByTitle

urlpatterns = [
    path("", ListCreateTodoAPIView.as_view(), name="todos"),
    path("<int:id>/", DetailTodoAPIView.as_view(), name="detail"),
    path("todays-todo/", TodaysTodo.as_view(), name="todays-todos"),
    path("getTodoByTitle/<str:title>/",
         GetTodoByTitle.as_view(), name="todo-by-title")
]
