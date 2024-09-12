from rest_framework import serializers 
from . models import *
  
class ReactSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Post 
        fields = ['id', 'title', 'content', 'image', 'author', 'created_at'] 