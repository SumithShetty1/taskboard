from django.db import models
from django.contrib.auth.models import AbstractUser


# Custom User model to authenticate using email instead of username
class User(AbstractUser):
    username = models.CharField(max_length=100)  # Custom username field
    email = models.EmailField(unique=True)  # Unique email field

    USERNAME_FIELD = 'email'  # Use email as the primary identifier
    REQUIRED_FIELDS = ['username']  # Make username a required field during registration


# Todo model for user tasks with completion status and timestamp
class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relationship to User model
    title = models.CharField(max_length=1000)  
    completed = models.BooleanField(default=False)  
    date = models.DateTimeField(auto_now_add=True)  # Automatically set the date when the todo is created

    def __str__(self):
        return self.title[:30]  # Display first 30 characters of the title in the admin panel
