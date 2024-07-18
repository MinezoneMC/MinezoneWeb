from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # This is the URL pattern for the home page
    path('support/', views.support, name='support'),  # This is the URL pattern for the support page
    path('forum/', views.forum, name='forum'),# This is the URL pattern for the forum page
    path('game/', views.game, name='game'),  # This is the URL pattern for the game page

]