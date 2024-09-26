from rest_framework import serializers 
from . models import *
  
class ReactSerializer(serializers.ModelSerializer): 
    author = serializers.StringRelatedField(read_only=True)  # To display the username

    class Meta: 
        model = Post 
        fields = ['id', 'title', 'content', 'image', 'author', 'created_at'] 


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ["token", "created_at", "expires_at", "user_id", "is_used"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "password","salt"]


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # To display the username

    class Meta:
        model = Profile
        fields = ["user", "bio", "profile_pic", "created_at"]
        read_only_fields = ["user"]  # To ensure user field isn't modified via request
