from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
from hello.serializers import UserSerializer
from hello.models import User
from rest_framework import  generics


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @detail_route()
    def changeName(self, request, *args, **kwargs):
        get = request.GET
        user = self.get_object()
        user.username = get.get('newName')
        user.save()
        return Response(user.username)

    @detail_route()
    def changePassword(self,request,*args,**kwargs):
        get = request.GET
        user = self.get_object()
        user.password = get.get('password')
        user.save()
        return Response(user.password)

    @list_route()
    def filterUser(self, request):
        users = User.objects.filter(id__in=range(3))
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer