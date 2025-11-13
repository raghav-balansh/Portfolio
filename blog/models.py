from django.db import models

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    external_url = models.URLField(blank=True)
    published_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=True)
    thumbnail = models.ImageField(upload_to='blog/thumbnails/', blank=True)

    def __str__(self):
        return self.title