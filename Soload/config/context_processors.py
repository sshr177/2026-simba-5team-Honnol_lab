from main.models import Profile

def global_data(request):
    data = {'BRAND_NAME': 'Soload'}
    if request.user.is_authenticated:
        profile, created = Profile.objects.get_or_create(user=request.user)
        data['user_profile'] = profile
    return data

