from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="api-routes"),
    path('flashcards/', views.FlashcardsList, name="flashcards-list"),
    path('flashcards/<int:pk>/', views.FlashcardDetails, name="flashcard-details"),
    path('flashcards/create/', views.FlashcardCreate, name="flashcard-create"),
    path('flashcards/<int:pk>/update/', views.FlashcardUpdate, name="flashcard-update"),
    path('flashcards/<int:pk>/delete/', views.FlashcardDelete, name="flashcard-delete"),
]