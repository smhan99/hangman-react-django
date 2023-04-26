from .serializers import GameSerializer, LeaderboardSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from hangman.utils import get_word
from hangman.words import words
from hangman.models import Game, Leaderboard
from .utils import is_started,make_guess,check_game_state
from django.core.exceptions import ObjectDoesNotExist


@api_view(['POST','GET'])
def start_game(request):

    if request.user.is_authenticated:
        word = get_word(words) 
        game = Game.objects.create(word=word, user=request.user)
        serializer = GameSerializer(game, context={'user': request.user}, many=False)  
        return Response(serializer.data)
    else:
        return Response({'error': 'User is not authenticated'})



@api_view(['POST'])
def user_guess(request, game_id):
    game_id = request.data.get('game_id')
    guess = request.data.get('guess').capitalize()
    game = Game.objects.get(game_id=game_id)

    if not game.is_started:
        is_started(game)

    result = make_guess(game, guess)

    if result:
        data = {
            'message': 'Guess successful',
            'guesses': game.guesses,
            'remaining_guesses': game.remaining_guesses,
            'is_over': game.is_over,
            'is_winner': game.is_winner
        }

        try:
            leader_count = Leaderboard.objects.get(user=request.user)
        except ObjectDoesNotExist:
            leader_count = Leaderboard(user=request.user, win_count=0)
            leader_count.save()

        if game.is_over and game.is_winner:
            leader_count.win_count += 1
            leader_count.save()

        return Response(data)
    else:
        data = {
            'error': 'Invalid guess or game over',
            'guesses': game.guesses,
            'remaining_guesses': game.remaining_guesses,
            'is_over': game.is_over,
            'is_winner': game.is_winner
        }
        return Response(data)



@api_view(['GET'])
def leaderboard(request):
    top_users = Leaderboard.objects.order_by('-win_count')[:10]
    serializer = LeaderboardSerializer(top_users, many=True)
    return Response(serializer.data)

