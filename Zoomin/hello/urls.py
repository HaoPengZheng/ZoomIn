from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter
from hello.apiView import UserViewSet
from hello.apiView import UserDetail

router = DefaultRouter()
router.register(r'user', UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^user/detail/(?P<pk>[0-9]+)$',UserDetail.as_view())
]
