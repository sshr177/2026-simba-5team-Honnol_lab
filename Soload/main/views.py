from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from .models import Profile, Place, Tag, VisitTime, Purpose, Review,PlaceLike,PlaceImage ,ReviewImage
from django.db.models import Avg, Count
from django.http import JsonResponse


# Create your views
def main(request):
    if not request.user.is_authenticated: 
        return redirect('start')

    user_profile = request.user.profile

    places = Place.objects.filter(recommended_level=user_profile.level).order_by('?')

    liked_place_ids = set(
        PlaceLike.objects.filter(user=request.user).values_list('place_id', flat=True)
    )

    places_data = []

    for place in Place.objects.all():
        if place.latitude is None or place.longitude is None:
            continue

        places_data.append({
            "id": place.id,
            "name": place.name,
            "lat": float(place.latitude),
            "lng": float(place.longitude),
            "recommended_level": place.recommended_level,
            "category": place.category,
            "avg_rating": place.reviews.aggregate(a=Avg("rating"))["a"] or 0,
            "review_count": place.reviews.count(),
        })

    return render(request, 'pages/main.html', {
        'user_profile': user_profile,
        'places': places,
        'places_data': places_data,
        'active_nav': 'main',
        'liked_place_ids': liked_place_ids
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
        else:
            return render(request, 'pages/login.html', {'error': '아이디 또는 비밀번호가 일치하지 않습니다.'})

    return render(request, 'pages/login.html')

def signup(request):
    if request.method == 'POST':
        email = request.POST.get('email', '')
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        confirm = request.POST.get('confirm', '')

        special_chars = "!@#$%^&*()_+-=[]{};:,.<>?/|~`"
        
        if User.objects.filter(username=username).exists():
            error = '이미 사용 중인 아이디입니다.'
        elif len(password) < 8:
            error = '비밀번호는 8자 이상이어야 합니다.'
        elif not any(c.isdigit() for c in password):
            error = '비밀번호에 숫자를 포함해주세요.'
        elif not any(c in special_chars for c in password):
            error = '비밀번호에 특수문자(!@#$ 등)를 포함해주세요.'
        elif password != confirm:
            error = '비밀번호가 일치하지 않습니다.'
        else:
            error = None

        if error:
            return render(request, 'pages/signup.html', {
                'error': error,
                'email': email,
                'username': username,
            })
        
        user = User.objects.create_user(
            email = email,
            username = username,
            password = password,
        )

        profile = user.profile
        profile.nickname = username
        profile.save()
            
        auth_login(request, user)

        return redirect('testpage')
        
    return render(request, 'pages/signup.html')

def logout(request):
    auth_logout(request)
    return redirect('start')

def placeinfo(request, place_id):
    place = get_object_or_404(Place, pk=place_id)
    reviews = place.reviews.all()
    is_liked = False
    if request.user.is_authenticated:
        is_liked = PlaceLike.objects.filter(user=request.user, place=place).exists()
    if request.user.is_authenticated and request.GET.get('same_level'):
        reviews = reviews.filter(writer__profile__level=request.user.profile.level)
    avg_rating = place.reviews.aggregate(avg_rating=Avg("rating"))["avg_rating"]
    top_tags = Tag.objects.filter(reviews__place = place).annotate(
        review_count=Count("reviews")).order_by("-review_count")[:3]
    top_visit_times = VisitTime.objects.filter(reviews__place=place).annotate(
        review_count=Count("reviews")).order_by("-review_count")[:3]

    return render(request, 'pages/placeinfo.html', {
        'place': place,
        'reviews': reviews,
        'review_count': place.reviews.count(),
        'avg_rating': avg_rating,
        'top_tags': top_tags,
        'top_visit_times': top_visit_times,
        'nunchi_low': place.reviews.filter(nunchi_score=1).count(),
        'nunchi_mid': place.reviews.filter(nunchi_score=2).count(),
        'nunchi_high': place.reviews.filter(nunchi_score=3).count(),
        'is_liked': is_liked,
        })

def createreview(request, place_id):
    if not request.user.is_authenticated:
        return redirect('start')
    place = get_object_or_404(Place, pk=place_id)
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return redirect('start')
        review = Review.objects.create(
            place=place, writer=request.user,
            nunchi_score=int(request.POST.get('nunchi_score', 1)),
            rating = float(request.POST.get('rating', 5)),
            recommended_level = int(request.POST.get('recommended_level', 1)),
            has_kiosk=request.POST.get('has_kiosk') == 'yes',
            has_single_seat=request.POST.get('has_single_seat') == 'yes',
            has_con=request.POST.get('has_con') == 'yes',
            has_wifi=request.POST.get('has_wifi') == 'yes',
            stay_time=request.POST.get('stay_time', ''),
            content=request.POST.get('content'),
        )
        for tid in request.POST.getlist('tags'):
            review.tags.add(get_object_or_404(Tag, pk=tid))

        for vid in request.POST.getlist('visit_times'):
            review.visit_times.add(get_object_or_404(VisitTime, pk=vid))

        for pid in request.POST.getlist('purposes'):
            review.purposes.add(get_object_or_404(Purpose, pk=pid))

        for img in request.FILES.getlist('images'):
            ri = ReviewImage.objects.create(review=review, image=img)
            PlaceImage.objects.create(place=place, image=ri.image.name)
    
        total = place.reviews.count()

        avg_level = place.reviews.aggregate(a=Avg('recommended_level'))['a']
        if avg_level is not None:
            place.recommended_level = round(avg_level)
            
        place.has_con = place.reviews.filter(has_con=True).count() * 2 >= total
        place.has_wifi = place.reviews.filter(has_wifi=True).count() * 2 >= total
        place.has_kiosk = place.reviews.filter(has_kiosk=True).count() * 2 >= total
        place.has_single_seat = place.reviews.filter(has_single_seat=True).count() * 2 >= total

        place.save()

        p = request.user.profile
        p.exp += 50 #리뷰작성시 들어오는 경험치
        if p.exp >= p.required_exp() and p.level < 5:
            p.exp -= p.required_exp()
            p.level +=1
        p.save()
        return redirect('placeinfo', place_id=place.id)
 
    group = get_place_group(place.category)
 
    return render(request, 'pages/createreview.html', 
        {
        'place': place,
        'group': group,
        'tags': Tag.objects.filter(group__in=[group, 'common']),
        'visit_times': VisitTime.objects.all(),
        'purposes': Purpose.objects.filter(group__in=[group, 'common']),
        'stay_choices': Review._meta.get_field('stay_time').choices,
        }
        )

def review_delete(request, review_id):
    review = get_object_or_404(Review, pk=review_id)
    if review.writer != request.user:
        return redirect('main')
    review.delete()
    return redirect('mypage')

def mypage(request):
    if not request.user.is_authenticated:
        return redirect('start')
    likes = PlaceLike.objects.filter(user=request.user)
    my_reviews = Review.objects.filter(writer=request.user)
    return render(request, 'pages/mypage.html', {
        'likes': likes,
        'my_reviews': my_reviews,
        'active_nav': 'mypage',
    })

def start(request):
    return render(request, 'pages/start.html')

def testpage(request):
    if not request.user.is_authenticated:
        return redirect('start')
    if request.method == 'POST':
        score = int(request.POST.get('score', 0))
        p = request.user.profile
        p.test_score = score
        p.level = score_to_level(score)
        p.save()
        return redirect('lastpage')
    return render(request, 'pages/honnoltest/testpage.html')

def lastpage(request):
    if not request.user.is_authenticated:
        return redirect('start')
    return render(request, 'pages/honnoltest/lastpage.html')

def score_to_level(score):
    if score <= 24: return 1
    elif score <= 37: return 2
    else: return 3

def place_like(request, place_id):
    if not request.user.is_authenticated:
        return JsonResponse({'success': False}, status=403)
    place = get_object_or_404(Place, pk=place_id)
    like, created = PlaceLike.objects.get_or_create(user=request.user, place=place)
    if created:
        liked = True
    else:
        like.delete()
        liked = False
    return JsonResponse({'success': True, 'liked': liked})


def create_place(request):
    if not request.user.is_authenticated:
        return redirect('start')
    if request.method == 'POST':
        kakao_id = request.POST.get('kakao_id')
        place = Place.objects.filter(kakao_id=kakao_id).first()
        if place:
            return redirect('placeinfo', place_id=place.id)
        if request.POST.get('confirm') == 'yes':
            lat = request.POST.get('latitude')
            lng = request.POST.get('longitude')
            place = Place.objects.create(
                kakao_id = kakao_id,
                name = request.POST.get('name', ''),
                address = request.POST.get('address', ''),
                category = request.POST.get('category', ''),
                tel = request.POST.get('phone', ''),
                latitude = float(lat) if lat else None,
                longitude = float(lng) if lng else None,

            )
            return redirect('createreview', place_id=place.id)
        return JsonResponse({'exists': False})
    return redirect('main')


def get_place_group(category):
    if category in ('카페', '음식점'):
        return 'food'
    return 'culture'

def user_profile(request, user_id):
    if not request.user.is_authenticated:
        return redirect('start')

    profile_user = get_object_or_404(User, pk=user_id)
    likes = PlaceLike.objects.filter(user=profile_user).select_related('place')
    my_reviews = Review.objects.filter(writer=profile_user).select_related('place')
    
    return render(request, 'pages/user_profile.html',{
        'profile_user': profile_user,
        'user_profile': profile_user.profile,
        'likes': likes,
        'my_reviews': my_reviews,
        'is_own_profile': request.user == profile_user,
    })
