from django.urls import path

# from todos.views import CreateTodoAPIView, ListTodoAPIView
from todos.views import ListTodoAPIView, CreateTodoAPIView , DetailTodoAPIView, TodaysTodo, GetTodoByTitle, UpdateTodoAPIView, DeleteTodoAPIView

urlpatterns = [
    path("", ListTodoAPIView.as_view(), name="todos"),
    path("create/", CreateTodoAPIView.as_view(), name="create"),
    path("<int:id>/", DetailTodoAPIView.as_view(), name="detail"),
    path("update/<int:id>/", UpdateTodoAPIView.as_view(), name="update"),
    path("delete/<int:id>/", DeleteTodoAPIView.as_view(), name="delete"),
    path("todays-todo/", TodaysTodo.as_view(), name="todays-todos"),
    path("getTodoByTitle/<str:title>/",
         GetTodoByTitle.as_view(), name="todo-by-title")
]
