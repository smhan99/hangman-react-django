from django.urls import path
from . import views, new_api

urlpatterns = [

    path('start_game', views.start_game, name="start_game"),
    path('user_guess/<game_id>', views.user_guess, name='user_guess'),
    # path('leaderboard', views.leaderboard, name='leaderboard'),

    # new APIs
    path('newGame', new_api.new_game, name='new_game'),
    path('gameDetails', new_api.get_game_details, name='get_game_details'),
    path('submitGame', new_api.submit_game, name='submit_game'),
    path('leaderboard', new_api.get_leaderboard, name='get_leaderboard'),

    # Auth API
    path('validateCreds', new_api.validate_credentials, name='validate_creds'),
    path('registerUser', new_api.register_user, name='register_user')
]