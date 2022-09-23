
from urllib import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Todo
from .serializers import TodoSerializer

# Create your views here.

@api_view(['GET'])
def getResponse(request):

    route = [
        {
            "Endpoints": '/todos/',
            "method": 'GET',
            "body": None,
            "description": "return an array of todos"
        }
    ]

    return Response(route)

@api_view(['GET'])
def getTodos(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)

    return Response(serializer.data)



@api_view(['GET'])
def getTodo(request,pk):
    todo = Todo.objects.get(id=pk)
    serializer = TodoSerializer(todo, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def createTodo(self,request,pk):
    # todo = JSONParser().parse(request)
    data = request.data
    todo = Todo.objects.create(tasks=data['tasks']).JSONParser().parse(request)

    serializer = TodoSerializer(data=todo, many=True)
    if serializer.is_valid():
        todo.save()
    
    return Response(todo.data, status=status.HTTP_201_CREATED)

# @api_view(['GET', 'POST'])
# def getRoutes(request):
#     if request.method == 'GET':
#         todo = Todo.objects.all()
#         serializer = TodoSerializer(todo, many=True)
#         return Response(serializer.data)
    
#     elif request.method


# @api_view(['POST'])
# def createTodo(request):
#     data = request.data
#     todo = Todo.objects.create(tasks=data['tasks'])

#     serializer = TodoSerializer(todo, many=True)
#     return Response(serializer.data)