from django.http import HttpResponse
from .forms import PostForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .forms import SignUpForm
from .models import Post
from .serializer import *
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import Group
from rest_framework.response import Response 
from rest_framework.views import APIView 


class ReactView(APIView):
    serializer_class = ReactSerializer

    def get(self, request, *args, **kwargs):
        # Get all posts
        posts = Post.objects.all().order_by('-created_at')
        
        # Serialize posts
        serializer = self.serializer_class(posts, many=True)
        
        # Check if the user can post
        can_post = request.user.groups.filter(name='CanMakePosts').exists()

        # Return the serialized data as JSON
        return Response({
            'posts': serializer.data,
            'can_post': can_post
        })

    def post(self, request, *args, **kwargs):
        form = PostForm(request.data, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            # Serialize the newly created post and return it
            serializer = self.serializer_class(post)

            return Response({
                'message': 'Post created successfully!',
                'post': serializer.data
            }, status=201)
        
        return Response(form.errors, status=400)

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

