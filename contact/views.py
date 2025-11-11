from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def contact_list(request):
    return render(request, 'contact/contact.html')