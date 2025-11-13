from django.shortcuts import render
from project.models import Project
from blog.models import BlogPost
from content.models import skills, certificates

# Create your views here.
def home(request):
    featured_project = Project.objects.filter(is_featured=True).first()
    upcoming_project = Project.objects.filter(is_upcoming=True)[:3]
    latest_blog = BlogPost.objects.filter(is_published=True).order_by('-published_at').first()
    certs = certificates.objects.order_by('-date')[:4]
    Skills = skills.objects.order_by('name')

    return render(request, 'core/home.html', {
        'featured_project': featured_project,
        'upcoming_project': upcoming_project,
        'latest_blog': latest_blog,
        'certificates': certs,
        'skills': Skills,
    })