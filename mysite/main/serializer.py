from rest_framework import serializers 
from . models import *

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ["token", "created_at", "expires_at", "user_id", "is_used"]

class ReactSerializer(serializers.ModelSerializer): 
    author = serializers.StringRelatedField(read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)

    class Meta: 
        model = Post 
        fields = ['id', 'title', 'content', 'image', 'author', 'author_id', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    author_id = serializers.IntegerField(source='author.id', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'author_id', 'forum', 'created_at']

class ForumSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Forum
        fields = ['id', 'title', 'content', 'author', 'author_id', 'created_at', 'comments']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'salt']

        
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'bio', 'profile_pic']
