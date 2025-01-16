from api.models import User, Todo
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, TodoSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


# Custom view for obtaining JWT tokens with additional claims
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# View to handle user registration (open to all users)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Simple endpoint to list available routes
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',  # Token obtain endpoint
        '/api/register/',  # Registration endpoint
        '/api/token/refresh/',  # Token refresh endpoint
    ]
    return Response(routes)

# Test endpoint that responds to both GET and POST requests
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # Only accessible by authenticated users
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

# View to list and create Todos (restricted to user-specific data)
class TodoListView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)

        # Filter todos by the specific user
        todo = Todo.objects.filter(user=user) 
        return todo

# View to retrieve, update, or delete a specific Todo (by user and todo id)
class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        todo_id = self.kwargs['todo_id']

        user = User.objects.get(id=user_id)
        todo = Todo.objects.get(id=todo_id, user=user)

        return todo

# View to mark a Todo as completed
class TodoMarkAsCompleted(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        todo_id = self.kwargs['todo_id']

        user = User.objects.get(id=user_id)
        todo = Todo.objects.get(id=todo_id, user=user)

        # Mark the todo as completed
        todo.completed = True
        todo.save()

        return todo
