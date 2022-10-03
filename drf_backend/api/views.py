
from urllib import request, parse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Todo
from .serializers import TodoSerializer



HOST = 'https://8000-dougmontas-appdjangores-3xebnjwwx58.ws-us69.gitpod.io/'

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
def getTask(self, id):
    model = Todo.objects.get(id=id)
    return model


@api_view(['DELETE'])
def deleteTodo(self,id):
    model = Todo.objects.get(id=id)
    model.delete()
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def createTodo(request):
    data = request.data
    todo = Todo.objects.create(tasks=data['text'],completed=data['completed'])
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)

    return Response(serializer.data)
    
    
