from django.urls import path

# from todos.views import CreateTodoAPIView, ListTodoAPIView
from todos.views import ListCreateTodoAPIView, DetailTodoAPIView, TodaysTodo, GetTodoByTitle, UpdateTodoAPIView

urlpatterns = [
    path("", ListCreateTodoAPIView.as_view(), name="todos"),
    path("<int:id>/", DetailTodoAPIView.as_view(), name="detail"),
    path("<int:id>/", UpdateTodoAPIView.as_view(), name="update"),
    path("todays-todo/", TodaysTodo.as_view(), name="todays-todos"),
    path("getTodoByTitle/<str:title>/",
         GetTodoByTitle.as_view(), name="todo-by-title")
]
