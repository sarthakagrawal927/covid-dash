import json
from django.shortcuts import render
import requests

headers = {
    'x-rapidapi-key': "9e8b1f3c3dmshcc4d917f45ff1aap16a18djsnadc41f41d89f",
    'x-rapidapi-host': "corona-virus-world-and-india-data.p.rapidapi.com"
}
res = requests.get(
    'https://corona-virus-world-and-india-data.p.rapidapi.com/api_india', headers=headers)

params = dict()
if res:
    print('Success!')
else:
    print('An error has occurred.')

print(res.json())
