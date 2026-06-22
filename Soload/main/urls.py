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
]