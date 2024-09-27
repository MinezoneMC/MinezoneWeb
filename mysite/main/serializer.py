from rest_framework import serializers 
from . models import *
  
class ReactSerializer(serializers.ModelSerializer): 
    author = serializers.StringRelatedField(read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)  # Add this line

    class Meta: 
        model = Post 
        fields = ['id', 'title', 'content', 'image', 'author', 'author_id', 'created_at']


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ["token", "created_at", "expires_at", "user_id", "is_used"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "password","salt"]


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)  # Add this line

    class Meta:
        model = Profile
        fields = ["user", "user_id", "bio", "profile_pic", "created_at"]
        read_only_fields = ["user", "user_id"]

class ReactSerializer(serializers.ModelSerializer): 
    author = serializers.StringRelatedField(read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)  # Add this line

    class Meta: 
        model = Post 
        fields = ['id', 'title', 'content', 'image', 'author', 'author_id', 'created_at']


class ForumSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Forum   
        fields = ["title", "content", "author", "created_at"]


