from django.urls import path
from . import views


urlpatterns = [
    path('', views.getResponse, name='routes'),
    path('todos/', views.getTodos, name='get-todos'),
    # path('todos/<str:pk>', views.getTodo, name='get-todo'),
    path('todos/create/', views.createTodo, name='create-todo')
]