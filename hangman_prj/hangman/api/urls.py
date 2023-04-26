from django.urls import path
from . import views

urlpatterns = [

    path('start_game', views.start_game, name="start_game"),
    path('user_guess/<game_id>', views.user_guess, name='user_guess'),
    path('leaderboard', views.leaderboard, name='leaderboard')
]