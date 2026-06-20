from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from .models import Profile, Place
# Create your views here.
def main(request):
    level = request.user.profile.level
    places = Place.objects.filter(recommended_level=level)
    return render(request, 'pages/main.html', {
        'places': places,
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
            username = username,
            email = email,
            password = password
        )

        Profile.objects.create(user=user, nickname=username)

        auth_login(request, user)

        return redirect('testpage')
    
    return render(request, 'pages/signup.html')

def logout(request):
    auth_logout(request)
    return redirect('start')

def placeinfo(request, place_id):
    place = get_object_or_404(Place, pk=place_id)
    return render(request, 'pages/placeinfo.html', {'place': place})

def createreview(request):
    return render(request, 'pages/createreview.html')

def mypage(request):
    return render(request, 'pages/mypage.html', {
        'active_nav': 'mypage'
    })

def start(request):
    return render(request, 'pages/start.html')

def testpage(request):
    if request.method == 'POST':
        score = int(request.POST.get('score', 0))
        p = request.user.profile
        p.test_score = score
        p.level = score_to_level(score)
        p.save()
        return redirect('lastpage')
    return render(request, 'pages/honnoltest/testpage.html')

def lastpage(request):
    return render(request, 'pages/honnoltest/lastpage.html')

def score_to_level(score):
    if score <= 17: return 1
    elif score <= 33: return 2
    else: return 3

