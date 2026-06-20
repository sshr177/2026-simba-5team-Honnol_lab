from django.db import models
from django.contrib.auth.models import User

# Create your models here.

LEVEL_NAME = {1: "달걀", 2: "병아리", 3: "용감 병아리", 4: "혼놀 영계", 5: "혼놀 마스터 닭"}
REQUIRED_EXP = {1: 100, 2: 200, 3: 300, 4: 400, 5: 0}

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=30, blank=True)
    level = models.IntegerField(default=1)
    exp = models.IntegerField(default=0)
    test_score = models.IntegerField(default=0)

    def level_name(self):
        return LEVEL_NAME.get(self.level, "달걀")

    def required_exp(self):
        return REQUIRED_EXP.get(self.level, 0)
    
    def character_image(self):
        return f"/static/images/chick-stage-{self.level}.png"
        
    def __str__(self):
        return f"{self.user.username} (Lv.{self.level})"



class Place(models.Model):
    images = models.ImageField(upload_to='places/', blank=True)
    name = models.CharField(max_length=100)
    recommended_level = models.IntegerField(default=1)
    category = models.CharField(max_length=30)
    address = models.CharField(max_length=200)
    descirption = models.TextField(blank=True)
    opening_hours = models.CharField(max_length=100, blank=True)
    tel = models.CharField(max_length=20, blank=True)
    has_wifi = models.BooleanField(default=False)
    has_con = models.BooleanField(default=False)
    has_kiosk = models.BooleanField(default=False)
    has_single_seat = models.BooleanField(default=False)
    has_partition = models.BooleanField(default=False)
    parking_available = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name