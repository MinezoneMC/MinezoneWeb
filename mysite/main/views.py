from django.shortcuts import render
from django.http import HttpResponse
from .models import post
# Create views here.

#Render the pages. The request parameter is required for the render function as it takes in the request and sends responses to the user.
def home(request):
    posts = post.objects.all().order_by('-date')
    return render(request, 'main/home.html', {'posts': posts})

def support(request):
    return render(request, "main/support.html")

def forum(request):
    return render(request, "main/forum.html")

def game(request):
    return render(request, "main/game.html")

