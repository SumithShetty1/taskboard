from django.contrib import admin
from api.models import User, Todo


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']  # Display 'username' and 'email' columns in the admin list view

class TodoAdmin(admin.ModelAdmin):
    list_editable = ['completed']  # Make 'completed' field editable directly from the list view
    list_display = ['user', 'title', 'completed', 'date']  # Display 'user', 'title', 'completed', and 'date' columns

# Register the models to the admin site
admin.site.register(User, UserAdmin)
admin.site.register(Todo, TodoAdmin)
