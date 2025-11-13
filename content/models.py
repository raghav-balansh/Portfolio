from django.db import models

# Create your models here.
class skills(models.Model):
    name = models.CharField(max_length=100)
    # example - beginner, medium, adv
    level = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return self.name
    
class certificates(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200, blank=True)
    date = models.DateField(blank=True, null=True)
    cert_image = models.ImageField(upload_to='certificates/images/', blank=True)
    cert_url = models.URLField(blank=True)
    
    def __str__(self):
        return self.title