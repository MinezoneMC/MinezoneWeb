from django.http import HttpResponse
from .forms import PostForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .forms import SignUpForm
from .models import Post
from .serializer import *
from rest_framework.response import Response 
from rest_framework.views import APIView 
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.core.mail import send_mail
import hashlib

SALT = "8b4f6b2cc1868d75ef79e5cfb8779c11b6a374bf0fce05b485581bf4e1e25b96c8c2855015de8449"

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


class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data["email"]
        password = request.data["password"]
        hashed_password = make_password(password=password, salt=SALT)
        user = User.objects.get(email=email)
        if user is None or user.password != hashed_password:
            return Response(
                {
                    "success": False,
                    "message": "Invalid Login Credentials!",
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"success": True, "message": "You are now logged in!"},
                status=status.HTTP_200_OK,
            )


class SignupView(APIView):
    def post(self, request, format=None):
        request.data["password"] = make_password(
            password=request.data["password"], salt=SALT
        )
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "You are now registered on our website!"},
                status=status.HTTP_200_OK,
            )
        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_200_OK,
            )



def support(request):
    return render(request, "main/support.html")

def forum(request):
    return render(request, "main/forum.html")

def game(request):
    return render(request, "main/game.html")

