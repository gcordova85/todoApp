from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('todo-list/', views.todoItemList, name='todo-list'),
    path('todo-detail/<str:pk>/', views.todoItemList, name='todo-detail'),
    path('todo-create/', views.todoCreate, name='todo-create'),
    path('todo-update/<str:pk>/', views.todoUpdate, name='todo-update'),
    path('todo-delete/<str:pk>/', views.todoDelete, name='todo-delete'),
]
