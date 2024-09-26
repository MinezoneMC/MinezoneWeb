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
from django.conf import settings
from datetime import datetime, timedelta
import hashlib
import uuid
from django.utils import timezone


URL = "http://localhost:8000"

def mail_template(content, button_url, button_text):
    return f"""<!DOCTYPE html>
            <html>
            <body style="text-align: center; font-family: "Verdana", serif; color: #000;">
                <div style="max-width: 600px; margin: 10px; background-color: #fafafa; padding: 25px; border-radius: 20px;">
                <p style="text-align: left;">{content}</p>
                <a href="{button_url}" target="_blank">
                    <button style="background-color: #444394; border: 0; width: 200px; height: 30px; border-radius: 6px; color: #fff;">{button_text}</button>
                </a>
                <p style="text-align: left;">
                    If you are unable to click the above button, copy paste the below URL into your address bar
                </p>
                <a href="{button_url}" target="_blank">
                    <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">{button_url}</p>
                </a>
                </div>
            </body>
            </html>"""

class ReactView(APIView):
    def get(self, request, *args, **kwargs):
        # Get all posts
        posts = Post.objects.all().order_by('-created_at')
        
        # Serialize posts
        serializer = ReactSerializer(posts, many=True)
        # Check if the user can post
        can_post = request.user.groups.filter(name='CanMakePosts').exists()

        # Return the serialized data as JSON
        return Response({
            'posts': serializer.data,
            'can_post': can_post
        }, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = ReactSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data["email"]
        password = request.data["password"]
        user = User.objects.get(email=email)
        hashed_password = make_password(password=password, salt=user.salt)


        if user is None or user.password != hashed_password:
            return Response(
                {
                    "success": False,
                    "message": "Invalid Login Credentials!",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            return Response(
                {"success": True, "message": "You are now logged in!", "user": user.name},
                status=status.HTTP_200_OK,
            )


class SignupView(APIView):
    def post(self, request, format=None):
        salt = uuid.uuid4().hex
        
        request.data["salt"] = salt
        request.data["password"] = make_password(
            password=request.data["password"], salt=salt
        )

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request, format=None):
        user_id = request.data["id"]
        token = request.data["token"]
        password = request.data["password"]
        salt = uuid.uuid4().hex

        token_obj = Token.objects.filter(
            user_id=user_id).order_by("-created_at")[0]
        if token_obj.expires_at < timezone.now():
            return Response(
                {
                    "success": False,
                    "message": "Password Reset Link has expired!",
                },
                status=status.HTTP_200_OK,
            )
        elif token_obj is None or token != token_obj.token or token_obj.is_used:
            return Response(
                {
                    "success": False,
                    "message": "Reset Password link is invalid!",
                },
                status=status.HTTP_200_OK,
            )
        else:
            token_obj.is_used = True
            hashed_password = make_password(password=password, salt=salt)
            ret_code = User.objects.filter(
                id=user_id).update(password=hashed_password)
            if ret_code:
                token_obj.save()
                return Response(
                    {
                        "success": True,
                        "message": "Your password reset was successfully!",
                    },
                    status=status.HTTP_200_OK,
                )

class ForgotPasswordView(APIView):
    def post(self, request, format=None):
        email = request.data["email"]
        user = User.objects.get(email=email)
        created_at = timezone.now()
        expires_at = timezone.now() + timezone.timedelta(1) # token expires in 1 day
        salt = uuid.uuid4().hex

        # Generate token
        token = hashlib.sha512(
            (str(user.id) + user.password + created_at.isoformat() + salt).encode(
                "utf-8"
            )
        ).hexdigest()

        token_obj = {
            "token": token,
            "created_at": created_at,
            "expires_at": expires_at,
            "user_id": user.id,
        }

        serializer = TokenSerializer(data=token_obj)
        if serializer.is_valid():
            serializer.save()
            subject = "Forgot Password Link"
            content = mail_template(
                "We have received a request to reset your password. Please reset your password using the link below.",
                f"{URL}/resetPassword?id={user.id}&token={token}",
                "Reset Password",
            )
            send_mail(
                subject=subject,
                message=content,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                html_message=content,
            )
            return Response(
                {
                    "success": True,
                    "message": "A password reset link has been sent to your email.",
                },
                status=status.HTTP_200_OK,
            )
        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {
                    "success": False,
                    "message": error_msg,
                },
                status=status.HTTP_200_OK,
            )
        
class UserProfileView(APIView):
    def get(self,request):
        user = request.user
        profile = Profile.objects.get(user = user)
        if profile is not None:
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        
        return Response({"message": "Profile not found!"}, status = status.HTTP_404_NOT_FOUND)
        
    def post(self,request, format = None):
        serializers = ProfileSerializer(data = request.data)
        if serializers.is_valid():
            #Ensure that the user is attached to the profile
            serializers.save(user = request.user)
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors)

