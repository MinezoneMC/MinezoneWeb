from django.db import models

# Create models here.
class post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title #Just to make it easier to read in the admin panel