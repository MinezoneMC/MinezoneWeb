from rest_framework import serializers 
from . models import *

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ["token", "created_at", "expires_at", "user_id", "is_used"]

class ReactSerializer(serializers.ModelSerializer): 
    author = serializers.StringRelatedField(read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)  # Add this line

    class Meta: 
        model = Post 
        fields = ['id', 'title', 'content', 'image', 'author', 'author_id', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()  
    forum = serializers.StringRelatedField()   

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'forum', 'created_at']



class ForumSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Forum
        fields = ['id','title', 'content', 'author', 'created_at', 'comments']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id','user', 'bio', 'profile_pic']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['profile','id', 'name', 'email', 'password','salt']
