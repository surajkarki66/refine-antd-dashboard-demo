from rest_framework.test import APITestCase
from authentication.models import User

class TestModel(APITestCase):

    def test_create_user(self):
        user = User.objects.create_user('abbracx','abbracx@company.com', 'password123!@')

        self.assertIsInstance(user, User)
        self.assertEqual(user.email, 'abbracx@company.com')
        self.assertFalse(user.is_staff)

    def test_create_superuser(self):
        user = User.objects.create_superuser('abbracx','abbracx@company.com', 'password123!@')
        
        self.assertIsInstance(user, User)
        self.assertEqual(user.email, 'abbracx@company.com')
        self.assertTrue(user.is_staff)

    def test_raises_error_when_no_username_is_supplied(self):
        self.assertRaises(ValueError, User.objects.create_user,username='', email='abbracx@company.com', password='password123!@')

    def test_raises_error_when_no_email_is_supplied(self):
        self.assertRaises(ValueError, User.objects.create_user,username='abbracx', email='', password='password123!@')

    def test_raises_error_with_message_when_no_username_is_supplied(self):
        # If you want to test for message, write your code in a context manager.
        # How does it work? Write your expression and then run the function that
        # should generate that exception.
        with self.assertRaisesMessage(ValueError,'The given username must be set'):
            User.objects.create_user(username='',email='abbracx@company.com',password='password123!@')

    def test_raises_error_with_message_when_no_username_is_supplied(self):
        # If you want to test for message, write your code in a context manager.
        # How does it work? Write your expression and then run the function that
        # should generate that exception.
        with self.assertRaisesMessage(ValueError,'The given email must be set'):
            User.objects.create_user(username='abbracx',email='',password='password123!@')
        
    def test_creates_superuser_with_superuser_status(self):
        with self.assertRaisesMessage(ValueError,'Superuser must have is_superuser=True.'):
            User.objects.create_superuser(username='abbracx',email='abbracx@company.com',password='password123!@',is_superuser=False)

    def test_creates_superuser_with_staff_status(self):
        with self.assertRaisesMessage(ValueError,'Superuser must have is_staff=True.'):
            User.objects.create_superuser(username='abbracx',email='abbracx@company.com',password='password123!@',is_staff=False)
        