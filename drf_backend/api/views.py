
from urllib import request, parse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Todo
from .serializers import TodoSerializer


# Create your views here.
HOST = 'https://8000-dougmontas-appdjangores-3xebnjwwx58.ws-us69.gitpod.io/api/todos/create/'

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
def createTodo(request):
    
    data = parse.urlencode({"text": "program a project"})
    data = data.encode('ascii')
    response = request.urlopen(HOST, data) # this will make the method "POST"
    return response, info()
    
    # data = request.data
    # serializer = TodoSerializer(data=request.data)
    # if serializer.is_valid():
    #     serializer.save()
    # return data
    
    # serializer = TodoSerializer(data=request.data)
    # if serializer.is_valid():
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # data = request.body
    # print(data, "DATA")
    # todo = Todo.objects.create(tasks=data[data], completed=False)

    # serializer = TodoSerializer(data=todo, many=True)
    # if serializer.is_valid():
    #     todo.save()
    
    # return Response(todo.data, status=status.HTTP_201_CREATED)

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

#  {
#         "id": 1,
#         "tasks": "Code a full stack app with django and react",
#         "completed": false,
#         "created": "2022-09-20T23:20:54.794853Z"
#     },
#     {
#         "id": 2,
#         "tasks": "keep practicing",
#         "completed": false,
#         "created": "2022-09-20T23:21:21.806999Z"
#     },
#     {
#         "id": 4,
#         "tasks": "add post to the frontend",
#         "completed": false,
#         "created": "2022-09-21T22:41:36.719343Z"
#     }