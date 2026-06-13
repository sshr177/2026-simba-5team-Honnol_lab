from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login

# Create your views here.
def main(request):
    return render(request, 'pages/main.html', {
        'active_nav': 'main'
    })

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            auth_login(request, user)

            return redirect('main')

    return render(request, 'pages/login.html')

def signup(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        auth_login(request, user)

        return redirect('testpage')
    
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

def testpage(request):
    return render(request, 'pages/honnoltest/testpage.html')

def lastpage(request):
    return render(request, 'pages/honnoltest/lastpage.html')