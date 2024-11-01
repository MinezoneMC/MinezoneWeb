from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from .forms import SignUpForm
from .models import *
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
from rest_framework import status, permissions
from rest_framework.parsers import MultiPartParser, FormParser

URL = "http://localhost:5173"

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
        posts = Post.objects.all().order_by('-created_at')
        serializer = ReactSerializer(posts, many=True)
        can_post = request.user.groups.filter(name='CanMakePosts').exists()
        return Response({
            'posts': serializer.data,
            'can_post': can_post
        }, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data["email"]
        password = request.data["password"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"success": False, "message": "Invalid Login Credentials!"}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = make_password(password=password, salt=user.salt)
        if user.password != hashed_password:
            return Response({"success": False, "message": "Invalid Login Credentials!"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                "success": True,
                "message": "You are now logged in!",
                "user": user.name,
                "email": user.email,
                "user_id": user.id
            }, status=status.HTTP_200_OK)

class SignupView(APIView):
    def post(self, request, format=None):
        salt = uuid.uuid4().hex
        request.data["salt"] = salt
        request.data["password"] = make_password(
            password=request.data["password"], salt=salt
        )
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "id": user.id,
                "name": user.name,
                "email": user.email,
            }, status=status.HTTP_201_CREATED)
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
                id=user_id).update(password=hashed_password, salt=salt)
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
        expires_at = timezone.now() + timezone.timedelta(1)  # token expires in 1 day
        salt = uuid.uuid4().hex

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
            "is_used": False,
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
                from_email=settings.DEFAULT_FROM_EMAIL,
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

class ForumView(APIView):
    def get(self, request):
        posts = Forum.objects.all().order_by('-created_at')
        serializer = ForumSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user_req = request.data["author"]
        user = User.objects.get(name=user_req)
        serializer = ForumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ForumDetailView(APIView):
    def get(self, request, forum_id):
        try:
            forum = Forum.objects.get(id=forum_id)
            serializer = ForumSerializer(forum)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Forum.DoesNotExist:
            return Response({"message": "Forum not found"}, status=status.HTTP_404_NOT_FOUND)

class CommentView(APIView):
    def get(self, request, forum_id):
        comments = Comment.objects.filter(forum_id=forum_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, forum_id):
        try:
            forum = Forum.objects.get(id=forum_id)
            user_req = request.data.get("author")
            user = User.objects.get(name=user_req)
            comment_data = {
                "content": request.data.get("content"),
            }

            serializer = CommentSerializer(data=comment_data)
            if serializer.is_valid():
                serializer.save(author=user, forum=forum)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Forum.DoesNotExist:
            return Response({"message": "Forum not found"}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, user_id):
        try:
            fetched_user = User.objects.get(id=user_id)
            profile, created = UserProfile.objects.get_or_create(user=fetched_user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, user_id):
        try:
            fetched_user = User.objects.get(id=user_id)
            profile, created = UserProfile.objects.get_or_create(user=fetched_user)
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class UserPublicProfileView(APIView):
    def get(self, request, user_id):
        try:
            fetched_user = User.objects.get(id=user_id)
            profile, created = UserProfile.objects.get_or_create(user=fetched_user)
            profile_serializer = UserProfileSerializer(profile)

            data = {
                'id': fetched_user.id,
                'name': fetched_user.name,
                # 'email': fetched_user.email,  # Exclude email if you don't want to expose it
                'bio': profile_serializer.data.get('bio', ''),
                'profile_pic': profile_serializer.data.get('profile_pic', None),
            }
            return Response(data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class UserSupport(APIView):
    def post(self, request):
        request.data['user_id']
        user = User.objects.get(id = request.data['user_id'])
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            send_mail(
                subject="Ticket",
                message=f"User: {user.name}\nEmail: {user.email}\nDescription: {request.data['description']}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list= ['minezonetickets@gmail.com'],
            )
            serializer.save(user=user)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)