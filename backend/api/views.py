from .models import TodoItem
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TodoItemSerializer

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List':'/todo-list/',
        'Details':'/todo-detail/<str:pk>/',
        'Create':'/todo-create/',
        'Update':'/todo-update/<str:pk>/',
        'Delete':'/todo-delete/<str:pk>/',
    }

    return Response(api_urls)

@api_view(['GET'])
def todoItemList(request):
    todos = TodoItem.objects.all()
    serializer = TodoItemSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def todoDetails(request, pk):
    todos = TodoItem.objects.get(id=pk)
    serializer = TodoItemSerializer(todos, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def todoCreate(request):
    serializer =TodoItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def todoUpdate(request, pk):
    todo = TodoItem.objects.get(id=pk)
    serializer = TodoItemSerializer(instance=todo, data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
def todoDelete(request, pk):
    todo = TodoItem.objects.get(id=pk)
    todo.delete()
    
    return Response("Item succesfully deleted")