from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),  
    path('signup/', views.signup_view, name='signup'),
    path('support/', views.support, name='support'), 
    path('forum/', views.forum, name='forum'),
    path('game/', views.game, name='game'),  

]