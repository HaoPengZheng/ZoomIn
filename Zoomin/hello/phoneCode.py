import urllib.parse
import http.client
import json
import hashlib
import time
from django.http import HttpResponse



def sendCode(request):
    phoneNumber = request.POST.get('phoneNumber');
    SERVER_URL = "https://api.netease.im/sms/sendcode.action "
    APP_KEY = "18d42fc494f76fb18c529974d4d9ba7e"
    APP_SECRET = "0ce2e4d053be"
    NONCE = "123456"
    MOBILE = phoneNumber
    TEMPLATEID = 3952776
    CODELEN = "6"
    localtime = time.asctime(time.localtime(time.time()))
    CurTime = str(int(time.mktime(time.strptime(localtime, "%a %b %d %H:%M:%S %Y"))))
    string = APP_SECRET + NONCE + CurTime
    sha1 = hashlib.sha1(string.encode("utf-8"))
    CheckSum = sha1.hexdigest()
    data = {"mobile": MOBILE, "codeLen": CODELEN,"deviceId":25,"templateid": TEMPLATEID }
    data_url_encode = urllib.parse.urlencode(data)
    header = {"AppKey": APP_KEY, "Nonce": NONCE, "CurTime": CurTime, "CheckSum": CheckSum,
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}
    conn = http.client.HTTPConnection("api.netease.im")
    conn.request("POST", url=SERVER_URL, headers=header, body=data_url_encode)
    response = conn.getresponse()
    res = response.read()
    resp = json.loads(res)
    if resp != None:
        request.session['phoneCode'] = resp['obj'];
    return HttpResponse('发送成功')

def phoneCodeVaild(request):
    SERVER_URL = "https://api.netease.im/sms/verifycode.action "
    APP_KEY = "18d42fc494f76fb18c529974d4d9ba7e"
    APP_SECRET = "0ce2e4d053be"
    NONCE = "123456"
    MOBILE = request.POST.get("mobile")
    CODE = request.POST.get('code')
    localtime = time.asctime(time.localtime(time.time()))
    CurTime = str(int(time.mktime(time.strptime(localtime, "%a %b %d %H:%M:%S %Y"))))
    string = APP_SECRET + NONCE + CurTime
    sha1 = hashlib.sha1(string.encode("utf-8"))
    CheckSum = sha1.hexdigest()
    data = {"mobile": MOBILE, "code": CODE}
    data_url_encode = urllib.parse.urlencode(data)
    header = {"AppKey": APP_KEY, "Nonce": NONCE, "CurTime": CurTime, "CheckSum": CheckSum,
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}
    conn = http.client.HTTPConnection("api.netease.im")
    conn.request("POST", url=SERVER_URL, headers=header, body=data_url_encode)
    response = conn.getresponse()
    res = response.read()
    resp = json.loads(res)
    if resp['code']==200:
        return HttpResponse("yes")
    elif resp['code']==413:
        return HttpResponse("no")
    else:
        return HttpResponse("其他错误")








