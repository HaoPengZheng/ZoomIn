from rest_framework import serializers
from hello.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'created', 'username', 'password')

