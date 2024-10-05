from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.notes, name='notes'),
    path('notes/<slug:slug>/', views.note_detail, name='note_detail'),
    path("notes-search/", views.search_notes, name='notes-search')

]

#endpoints
# get all notes and create new note = "127.0.0.1:8000/notes/"
# get specigic note = "127.0.0.1:8000/notes/note-slug/"