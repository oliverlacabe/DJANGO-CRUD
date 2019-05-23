from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('saveuser', views.saveUsers, name='saveuser'),
    path('getusers', views.getUsers, name='getusers'),
    path('deleteuser', views.deleteUsers, name='deleteuser'),
]
