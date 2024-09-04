from django.http import HttpResponse
from .forms import PostForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .forms import SignUpForm
from .models import Post
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import Group


def home(request):
    can_post = request.user.groups.filter(name='CanMakePosts').exists()    
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)      
            post.author = request.user
            post.save()
            return redirect('home')
    else:   
        form = PostForm()

    posts = Post.objects.all().order_by('-created_at')  # Fetch all posts, ordered by creation date (most recent first)
    
    #Context is a dictionary that passes data to the template
    context = {
        'form': form,
        'posts': posts,
        'can_post': can_post,
    }
    return render(request, 'main/home.html', context)

def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            user.save()
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            return redirect('home')  # Adjust to your success URL
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})



def support(request):
    return render(request, "main/support.html")

def forum(request):
    return render(request, "main/forum.html")

def game(request):
    return render(request, "main/game.html")

