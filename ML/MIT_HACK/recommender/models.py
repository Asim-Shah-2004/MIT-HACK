from django.db import models

# Create your models here.
from django.db import models

class Investor(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=50)
    location_country = models.CharField(max_length=100)
    location_state = models.CharField(max_length=100)
    location_city = models.CharField(max_length=100)
    interested_industries = models.JSONField(default=list)
    amount_looking_to_invest = models.FloatField()
    investment_type = models.CharField(max_length=50)
    interested_in_rural_business = models.BooleanField()
    engagement_type = models.CharField(max_length=50)

class SME(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    location_country = models.CharField(max_length=100)
    location_state = models.CharField(max_length=100)
    location_city = models.CharField(max_length=100)
    business_type = models.CharField(max_length=100)
    challenges_faced = models.JSONField(default=list)
    goals_and_aspirations = models.JSONField(default=list)
