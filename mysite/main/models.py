from django.db import models
from django.contrib.auth.models import User



#Token for user authentication
class Token(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    user_id = models.IntegerField()
    is_used = models.BooleanField(default=False)

#For posts on the home page
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
    
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    salt = models.CharField(max_length=255, null = True, blank=True)
    
    def __str__(self) -> str:
        return self.name
    
class Forum(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    forum = models.ForeignKey(Forum, related_name='comments', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author} on {self.forum}'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    def __str__(self):
        return f"{self.user}'s Profile"
    
class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the user
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
