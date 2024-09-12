from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views



urlpatterns = [
    path('', views.ReactView.get, name='home'),  
    path('signup/', views.signup_view, name='signup'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('support/', views.support, name='support'), 
    path('forum/', views.forum, name='forum'),
    path('game/', views.game, name='game'),  
    path('accounts/', include('django.contrib.auth.urls')),  # This includes the built-in auth URLs
] 