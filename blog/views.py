from django.shortcuts import render
from django.http import HttpResponse
from .models import BlogPost
# Create your views here.
def blog_list(request):
    post = BlogPost.objects.filter(is_published = True).order_by('published_at')
    return render(request, 'blog/list.html', {'posts': post})