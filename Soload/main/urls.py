from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.logout, name='logout'),
    path('placeinfo/<int:place_id>/', views.placeinfo, name='placeinfo'),
    path('createreview/<int:place_id>/', views.createreview, name='createreview'),
    path('mypage/', views.mypage, name='mypage'),
    path('start/', views.start, name='start'),
    path('testpage/', views.testpage, name="testpage"),
    path('lastpage/', views.lastpage, name='lastpage'),
    path('place/<int:place_id>/like/', views.place_like, name="place_like"),
    path('review/<int:review_id>/delete/', views.review_delete, name='review_delete'),
    path('place/create-or-get/', views.create_place, name='create_place'),
    path('profile/<int:user_id>/', views.user_profile, name='user_profile'),
    path('profile/<int:user_id>/follow/', views.follow, name='follow'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('review/<int:review_id>/like/', views.review_like, name='review_like'),
    path('review/<int:review_id>/update/', views.review_update, name='review_update'),
]
