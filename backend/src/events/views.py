from django.shortcuts import render
from .apps import EventsConfig

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .apps import EventsConfig

class match(APIView):

    def get(self, request):
        if request.method == 'GET':
            params = request.GET.get('sentence')
            response = EventsConfig.clusters
            return JsonResponse(response)