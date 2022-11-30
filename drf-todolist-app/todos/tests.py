from turtle import title
from django.http import response
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from todos.models import Todo


class TodosAPITestCase(APITestCase):

    def create_todo(self):
        sample_todo = {'title':'Hello world', 'desc':'Test', }
        resp = self.client.post(reverse('todos'), sample_todo)
        return resp

    def authenticate(self):
        self.client.post(reverse('register'), {'username':'username', 'email':'email@gmail.com', 'password':'password'})
        resp = self.client.post(reverse('login'), {'email':'email@gmail.com', 'password':'password'})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {resp.data['token']}")

class TestListCreateTodos(TodosAPITestCase):

    # Anytime we inherit from apitestcase we get access to a client
    def test_should_fail_create_todo_with_no_auth_user(self):
       
        resp = self.create_todo()
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


    def test_should_create_todo_with_auth_user(self):

        previous_todo_count = Todo.objects.all().count()

        self.authenticate()
        resp = self.create_todo()

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.all().count(), previous_todo_count + 1)
        self.assertEqual(resp.data['title'], 'Hello world')
        self.assertEqual(resp.data['desc'], 'Test')

    def test_retrieves_all_todos(self):

        self.authenticate()
        resp = self.client.get(reverse('todos'))

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIsInstance(resp.data['results'], list)  
       
        self.create_todo()
        res = self.client.get(reverse('todos'))
        self.assertIsInstance(res.data['count'], int)
        self.assertEqual(res.data['count'], 1)

class TestTodoDetailAPIView(TodosAPITestCase):

    def test_retrieves_one_item(self):
        self.authenticate()
        resp =  self.create_todo()

        res = self.client.get(reverse('detail', kwargs={'id': resp.data['id']}))

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        todo = Todo.objects.get(id=resp.data['id'])

        self.assertEqual(todo.title, res.data['title'])

    def test_updates_one_item(self):
        self.authenticate()
        resp = self.create_todo()

        res = self.client.patch(reverse('detail', kwargs={'id': resp.data['id']}), {
            'title':'New Todo Update',
            'desc':'This is a desc of new todo update',
            'is_completed':True
        })

        updated_todo = Todo.objects.get(id=resp.data['id'])

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(updated_todo.title,'New Todo Update')
        self.assertEqual(updated_todo.is_completed, True)

    def test_deletes_one_item(self):
        self.authenticate()
        resp = self.create_todo()

        prev_db_count = Todo.objects.all().count()

        self.assertGreater(prev_db_count, 0)
        self.assertEqual(prev_db_count, 1)

        res = self.client.delete(reverse('detail', kwargs={'id': resp.data['id']}))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.all().count(), 0)

