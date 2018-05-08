from django.db import models
# Create your models here.


class User(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=20,unique=True)
    password = models.CharField(max_length=16)

    class Meta:
        ordering = ('created',)






