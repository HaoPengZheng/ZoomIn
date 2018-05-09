from django.shortcuts import render
from django.http import HttpResponseRedirect
from hello import  models
from hello import  phoneCode
def hello(request):
    return render(request, 'login.html')

def login(request):
    if request.method == "POST":
        username = request.POST.get("username", None)
        passowrd = request.POST.get("password", None)
        try:
            user = models.User.objects.get(username=username)
        except:models.User.DoesNotExist
        if passowrd == user.password:
            request.session['user']= user
            request.session['hasLogin'] = True;
            return HttpResponseRedirect('/data-import/')
        else:
            return render(request,'login.html')
def register(request):

    if request.method == "POST":
        username = request.POST.get("register-username", None)
        passowrd = request.POST.get("register-password", None)
        user,created = models.User.objects.get_or_create(username=username,password=passowrd)
        message = ' '
        if created :
            message ='注册成功'
        else:
            message = '该账号已经存在'
        return render(request,'login.html',{'message':message})

def dataImport(request):
    return render (request,'data-import.html')

def taskDistribution(request):
    return render(request,'task-distribution.html')