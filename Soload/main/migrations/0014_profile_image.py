from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0013_review_stay_time"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="image",
            field=models.ImageField(blank=True, upload_to="profiles/"),
        ),
    ]
