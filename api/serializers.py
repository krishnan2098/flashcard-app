from rest_framework import serializers
from .models import Flashcard, Meaning


class MeaningsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meaning
        fields = '__all__'

class FlashcardSerializer(serializers.ModelSerializer):
    meanings = MeaningsSerializer(many=True, read_only=True)
    class Meta:
        model = Flashcard
        fields = '__all__'