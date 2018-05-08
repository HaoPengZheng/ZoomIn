from django.http import HttpResponse
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import random
def random_color():
    """
    随机获取颜色
    :return:
    """
    return random.randint(0, 255), random.randint(10, 255), random.randint(64, 255)

# 获取验证码
def getVerifycode(request):
    """
    获取图片验证码
    :param request:
    :return:
    """
    width = 150
    height = 40
    # 画布
    image = Image.new('RGB', size=(width, height),color=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)))
    # 画笔
    draw = ImageDraw.Draw(image, 'RGB')
    # 字体
    font = ImageFont.truetype(r'C:\Windows\Fonts\Arial.ttf', 28)
    for i in range(10):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)
        x2 = random.randint(0, width)
        y2 = random.randint(0, height)
        # 生成干扰线
        draw.line((x1, y1, x2, y2), fill=random_color())
    verifycode = ''
    for i in range(5):
        a = str(random.randint(0, 9))
        b = chr(random.randint(97, 122))
        c = chr(random.randint(65, 90))
        captcha = random.choice([a, b, c])
        verifycode += captcha
        # 生成验证码文字
        draw.text(xy=(25 + i * 20, 5), text=captcha, font=font,
                  fill=(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255),))
    request.session['verifycode'] = verifycode

    for i in range(50):
        # 生成干扰点
        draw.point([random.randint(0, width), random.randint(0, height)], fill=random_color())
    f = BytesIO()
    image.save(f, 'png')
    data = f.getvalue()
    return HttpResponse(data)

def verifycodeValid(request):
    verifycode = request.POST.get('verifycode')
    if verifycode.upper() == request.session['verifycode'].upper():
        return HttpResponse('yes')
    else:
        return HttpResponse('no')
