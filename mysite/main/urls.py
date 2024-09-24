from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views
from .views import LoginView, ReactView, SignupView



urlpatterns = [
    path('', ReactView.as_view(), name='home'),  
    path('signup', SignupView.as_view() , name='signup'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('support/', views.support, name='support'), 
    path('forum/', views.forum, name='forum'),
    path('game/', views.game, name='game'),  
    path('login', LoginView.as_view(), name="login"),
] 