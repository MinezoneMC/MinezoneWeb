from django.db import models
from django.contrib.auth.models import User


# Create models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title #Just to make it easier to read in the admin panel