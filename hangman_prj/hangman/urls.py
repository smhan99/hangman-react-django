
from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('login_view', views.login_view, name='login_view'),
    path('logout_view', views.logout_view, name='logout_view'),
    path('register', views.register, name='register'),
]
