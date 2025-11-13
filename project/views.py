from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Project

def project_list(request):
    featured = Project.objects.filter(is_featured=True, is_published=True).first()
    upcoming = Project.objects.filter(is_upcoming=True)
    projects = Project.objects.filter(is_published=True).order_by('created_at')
    return render(request, 'project/list.html', {'featured':featured,'upcoming':upcoming,'projects':projects})

def project_details(request, slug):
    project = get_object_or_404(Project, slug=slug)
    return render(request,'project/details.html', {'project': project})