from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

from .models import Flashcard, Meaning
from .serializers import FlashcardSerializer, MeaningsSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/flashcards/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of flashcards'
        },
        {
            'Endpoint': '/flashcards/<str:pk>/',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single flashcard object'
        },
        {
            'Endpoint': '/flashcards/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new flashcard with data sent in post request'
        },
        {
            'Endpoint': '/flashcards/<str:pk>/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Updates an existing flashcard with data sent in post request'
        },
        {
            'Endpoint': '/notes/<str:pk>/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes an exiting flashcard'
        },
    ]

    return Response(routes)

@api_view(['GET'])
def FlashcardsList(request):
    flashcards = Flashcard.objects.all()
    serializer = FlashcardSerializer(flashcards, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def FlashcardDetails(request, pk):
    flashcard_id = pk
    flashcard = Flashcard.objects.get(id=flashcard_id)
    serializer = FlashcardSerializer(flashcard, many=False)
    print(FlashcardSerializer)
    return Response(serializer.data) 

@api_view(['POST'])
def FlashcardCreate(request):
    flashcard_data = dict(request.data)
    print(request.data)
    meanings_data = dict()
    dictionary_api_url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + str(flashcard_data["word"])
    print(dictionary_api_url)
    dictionary_api_res = requests.get(dictionary_api_url)
    print(dictionary_api_res)
    
    failed_words = []
    if dictionary_api_res.status_code == 404:
        failed_words.append(str(flashcard_data["word"]))
    
    res_json = dictionary_api_res.json()[0]

    if len(res_json["phonetics"]) and "audio" in res_json["phonetics"][0]:
        flashcard_data["audio"] = "https:" + res_json["phonetics"][0]["audio"]

    flashcard_data["is_completed"] = False
    flashcard_serializer = FlashcardSerializer(data = flashcard_data)

    if flashcard_serializer.is_valid():
        flashcard_serializer.save()
    
    meanings = res_json["meanings"]
    fc = Flashcard.objects.get(word=flashcard_data["word"])
    meanings_data["word"] = fc.id

    for m in meanings:
        meanings_data["part_of_speech"] = m["partOfSpeech"]
        definitions = m["definitions"]

        for d in definitions:
            meanings_data["meaning"] = d["definition"]

            if "example" in d:
                meanings_data["example"] = d["example"]

            meanings_serializer = MeaningsSerializer(data = meanings_data)
            if meanings_serializer.is_valid():
                meanings_serializer.save()

    return Response(flashcard_serializer.data)

@api_view(['POST'])
def FlashcardUpdate(request, pk):
    flashcard_id = pk
    flashcard = Flashcard.objects.get(id=flashcard_id)
    post_data = {}
    post_data["word"] = request.data["word"]
    post_data["is_completed"] = request.data["completed"]   
    print(post_data)
    flashcard_serializer = FlashcardSerializer(instance=flashcard, data=post_data)

    print(request.data)
    meaning = Meaning.objects.get(id=request.data["meaning_id"])
    meaning_data = {}
    meaning_data["word"] = pk
    meaning_data["id"] = request.data["meaning_id"]
    meaning_data["part_of_speech"] = request.data["part_of_speech"]
    meaning_data["meaning"] = request.data["meaning"]
    meaning_data["example"] = request.data["example"]
    print(meaning_data)
    if meaning is not None:
        meaning_serializer = MeaningsSerializer(instance=meaning, data=meaning_data)
    else:
        meaning_serializer = MeaningsSerializer(data=meaning_data)

    if meaning_serializer.is_valid() and meaning is not "":
        print("meaning is valid")
        meaning_serializer.save()
    else:
        print(meaning_serializer.errors)
        

    if flashcard_serializer.is_valid() and flashcard is not "":
        print("is-valid")
        flashcard_serializer.save()

    return Response(flashcard_serializer.data)

@api_view(['DELETE'])
def FlashcardDelete(request, pk):
    flashcard_id = pk
    flashcard = Flashcard.objects.get(id=flashcard_id)
    flashcard.delete()
    return Response("Object is deleted successfully.")
