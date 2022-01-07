from django.db import models

# Create your models here.
class Flashcard(models.Model):
    word = models.CharField(max_length=20)
    audio = models.TextField(null=True, blank=True)
    is_completed = models.BooleanField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.word

class Meaning(models.Model):
    meaning = models.TextField(null=True, blank=True)
    word = models.ForeignKey(Flashcard, on_delete=models.CASCADE, related_name="meanings")
    part_of_speech = models.CharField(max_length=20)
    example = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.word + ": " + self.meaning[0:100]