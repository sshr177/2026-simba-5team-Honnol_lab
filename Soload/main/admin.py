from django.contrib import admin
from .models import Profile, Place, Tag, VisitTime, Purpose, Review

admin.site.register(Profile)
admin.site.register(Place)
admin.site.register(Tag)
admin.site.register(VisitTime)
admin.site.register(Purpose)
admin.site.register(Review)
# Register your models here.

