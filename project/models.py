from django.db import models
from django.utils.text import slugify
# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=40, unique=True)
    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    short_desc = models.TextField()
    long_desc = models.TextField(blank=True)
    repo_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    blog_url = models.URLField(blank=True)
    cover_image = models.ImageField(upload_to='projects/covers/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)
    is_current = models.BooleanField(default=False)
    is_upcoming = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    stack = models.ManyToManyField(Tag, blank=True)
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='media/projects/images/')