from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


# Create your models here.

LEVEL_NAME = {1: "달걀", 2: "병아리", 3: "용감 병아리", 4: "혼놀 영계", 5: "혼놀 마스터 닭"}
REQUIRED_EXP = {1: 100, 2: 200, 3: 300, 4: 400, 5: 0}

GROUP_CHOICES = [
    ('food', '카페/음식점'),
    ('culture', '전시/공연/소품'),
    ('common', '공통'),
]

STAY_CHOICES = [
    ('30분 이하', '30분이하'),
    ('30분-1시간', '30분-1시간'),
    ('1시간-2시간', '1시간-2시간'),
    ('2시간 이상', '2시간 이상'),
]

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=30, blank=True)
    level = models.IntegerField(default=1)
    exp = models.IntegerField(default=0)
    test_score = models.IntegerField(default=0)
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)

    def level_name(self):
        return LEVEL_NAME.get(self.level, "달걀")

    def required_exp(self):
        return REQUIRED_EXP.get(self.level, 0)
    
    def character_image(self):
        return f"/static/images/chick-stage-{self.level}.png"

    def display_image(self):
        if self.image:
            return self.image.url
        return self.character_image()
        
    def __str__(self):
        return f"{self.user.username} (Lv.{self.level})"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Place(models.Model):
    name = models.CharField(max_length=100)
    recommended_level = models.IntegerField(default=1)
    category = models.CharField(max_length=30)
    address = models.CharField(max_length=200)
    descirptions = models.TextField(blank=True)
    opening_hours = models.CharField(max_length=100, blank=True)
    tel = models.CharField(max_length=20, blank=True)
    has_wifi = models.BooleanField(default=False)
    has_con = models.BooleanField(default=False)
    has_kiosk = models.BooleanField(default=False)
    has_single_seat = models.BooleanField(default=False)
    has_partition = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    kakao_id = models.CharField(max_length=50, blank=True)

    def thumbnail(self):
        first = self.images.first()
        if first:
            return first.image.url
        return None

    def __str__(self):
        return self.name

class PlaceImage(models.Model):
    place = models.ForeignKey(Place,related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='places/')
    def __str__(self):
        return f"{self.place.name} 사진"

class Tag(models.Model):
    name = models.CharField(max_length=30)
    group = models.CharField(max_length=10, choices=GROUP_CHOICES, default='common')
    def __str__(self):
        return self.name
    
class VisitTime(models.Model):
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name

class Purpose(models.Model):
    name = models.CharField(max_length=30)
    group = models.CharField(max_length=10, choices=GROUP_CHOICES, default='common')
    def __str__(self):
        return self.name

class Review(models.Model):
    place = models.ForeignKey(Place, related_name='reviews', on_delete=models.CASCADE)
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    nunchi_score = models.IntegerField(default=1)
    rating = models.FloatField(default=5.0)
    recommended_level = models.IntegerField(default=1)
    has_wifi = models.BooleanField(default=False)
    has_con = models.BooleanField(default=False)
    has_kiosk = models.BooleanField(default=False)
    has_single_seat = models.BooleanField(default=False)
    stay_time = models.CharField(max_length=20, choices=STAY_CHOICES, blank=True)
    content = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='reviews', blank=True)
    visit_times = models.ManyToManyField(VisitTime, related_name='reviews', blank=True)
    purposes = models.ManyToManyField(Purpose, related_name='reviews', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_reviews', blank=True)
    def __str__(self):
        return f"{self.place.name} - {self.writer.profile.nickname}"

class ReviewImage(models.Model):
    review = models.ForeignKey(Review, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='reviews/')
    def __str__(self):
        return f"{self.review.place.name} 후기 사진"

class PlaceLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place = models.ForeignKey(Place, related_name='likes', on_delete=models.CASCADE)
    class Meta:
        unique_together = ('user', 'place')
