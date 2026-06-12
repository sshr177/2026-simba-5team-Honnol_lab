from django.shortcuts import render

# Create your views here.
def main(request):
    return render(request, 'pages/main.html', {
        'active_nav': 'main'
    })

def login(request):
    return render(request, 'pages/login.html')

def signup(request):
    return render(request, 'pages/signup.html')

def placeinfo(request):
    return render(request, 'pages/placeinfo.html')

def createreview(request):
    return render(request, 'pages/createreview.html')

def mypage(request):
    return render(request, 'pages/mypage.html', {
        'active_nav': 'mypage'
    })

def start(request):
    return render(request, 'pages/start.html')

