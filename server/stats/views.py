from django.shortcuts import render
import requests
import json
# Create your views here.


def home(request):
    url = "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india"

    headers = {
        'x-rapidapi-key': "9e8b1f3c3dmshcc4d917f45ff1aap16a18djsnadc41f41d89f",
        'x-rapidapi-host': "corona-virus-world-and-india-data.p.rapidapi.com"
    }
    response = requests.request("GET", url, headers=headers)

    obj = response.json()
    print(type(obj))
    print(obj)
    context = {
        'stats': obj
    }
    return render(request, 'home.html', context)
