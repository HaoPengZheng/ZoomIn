"""Zoomin URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import hello.views as hv
import  hello.verifycode as verifycode
from django.conf.urls import include
import hello.phoneCode

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/',hv.hello),
    path('login/',hv.login),
    path('getVerifycode/',verifycode.getVerifycode),
    path('verifycodeVaild/',verifycode.verifycodeValid),
    path('sendPhoneCode/',hello.phoneCode.sendCode),
    path('phoneCodeVaild/',hello.phoneCode.phoneCodeVaild),
    path('register/',hv.register),
    path('data-import/',hv.dataImport),
    path('task-distribution/',hv.taskDistribution),
    path('data-analysis/',hv.dataAnalysis),
    path('data-mining/',hv.dataMining),
    path('data-processing/',hv.dataProcessing),
    path('api/', include('hello.urls')),
    path('logout/',hv.logout)
]
