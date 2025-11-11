from django.shortcuts import render
from django.http import HttpResponse

def project_list(request):
    return render(request, 'project/list.html')

