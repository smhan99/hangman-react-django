from rest_framework.decorators import permission_classes, authentication_classes, api_view
from hangman.models import Game, Leaderboard
from hangman.utils import create_game
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authentication import BasicAuthentication
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import IntegrityError
import uuid
from rest_framework.response import Response


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
def new_game(request):
    """
    Takes input as word and returns game ID.

    Input JSON:
    {
        "word" : <Custom word or leave it empty to get system generated word>
    }

    Output JSON:

    Success case:
    {
        "response":
        {
            "game_id": <UUID of the game created>
        }
    }

    Error case:
    {
        "error": <Error Message>
    }

    Request Type: POST
    Authentication Required: Yes - Basic Auth
    """
    try:
        word = str.upper(request.data['word'])
    except KeyError:
        return Response({'error': 'Missing word in the request data'})

    created_game = create_game(request.user, word)
    return Response({'response': {'game_id': created_game.game_id}})


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
def get_game_details(request):
    """
    Takes input as Game ID returns game details.

    Input JSON:
    {
        "game_id" : <UUID string of the game>
    }

    Output JSON:

    Success case:
    {
        "response" :
        {
            'game_id': <UUID of the game>
            'word': <Word of the game>
            'owner': <Username of the owner of the game>
            'is_over': True if game is done else False
        }
    }

    Error case:
    {
        "error": <Error Message>
    }

    Request Type: POST
    Authentication Required: Yes - Basic Auth
    """
    try:
        game_id = request.data['game_id']
    except KeyError:
        return Response({'error': 'Missing game_id in the request data'})

    try:
        game = Game.objects.get(game_id=uuid.UUID(game_id))
    except ObjectDoesNotExist:
        return Response({'error': 'Invalid Game ID'})
    except ValidationError:
        return Response({'error': 'Invalid Game ID'})

    game_obj = {
        'game_id': game.game_id,
        'word': game.word,
        'created_by': game.created_by.username if game.created_by else '',
        'played_by': game.played_by.username if game.played_by else '',
        'is_won': game.is_winner,
        'is_over': game.is_over
    }

    return Response({'response': game_obj})


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
def submit_game(request):
    """
    Takes finished game details and updates the game

    Input JSON:
    {
        "game_id" : <UUID string of the game>,
        "is_won": true or false
    }

    Output JSON:

    Success case:
    {
        "response": "Game updated successfully"
    }

    Error case:
    {
        "error": <Error Message>
    }

    Request Type: POST
    Authentication Required: Yes - Basic Auth
    """
    try:
        game_id = request.data['game_id']
        is_won = request.data['is_won']
    except KeyError as missing_key:
        return Response({'error': 'Missing key: ' + str(missing_key) + ' in the request'})

    try:
        current_game = Game.objects.get(game_id=uuid.UUID(game_id))
    except ObjectDoesNotExist:
        return Response({'error': 'Invalid game ID'})
    except ValueError:
        return Response({'error': 'Invalid game ID'})

    if current_game.is_over:
        return Response({'error': 'Game has already been submitted'})

    current_game.played_by = request.user
    current_game.is_over = True
    current_game.is_winner = is_won
    current_game.save()

    if not is_won:
        return Response({'response': 'Game updated successfully'})

    try:
        leaderboard_record = Leaderboard.objects.get(user=request.user)
    except ObjectDoesNotExist:
        leaderboard_record = Leaderboard(user=request.user, win_count=0)
        leaderboard_record.save()

    leaderboard_record.win_count += 1
    leaderboard_record.save()

    return Response({'response': 'Game updated successfully'})


@api_view(['POST'])
def validate_credentials(request):
    """
    Takes input as username and password returns if the credentials are valid.

    Input JSON:
    {
        "username": <username to be validated>
        "password": <password to be validated>
    }

    Output JSON:

    Success case:
    {
        "response":
        {
            "validated": <True if credentials are valid else False
        }
    }


    Error case:
    {
        "error": <Error Message>
    }

    Request Type: POST
    Authentication Required: No
    """
    try:
        username = request.data['username']
        password = request.data['password']
    except KeyError as missing_key:
        return Response({'error': 'Missing key: ' + str(missing_key) + ' in the request'})

    user = authenticate(request, username=username, password=password)
    return Response({'response': {'validated': user is not None}})


@api_view(['GET'])
def get_leaderboard(_):
    """
    Returns top 10 usernames and their #of games won


    Output JSON:

    Success case:
    {
        "response": [
            {
                "username": <username of the player>
                "win_count": #of games won by the player
            },
            ...,
            {
                "username": <username of the player>
                "win_count": #of games won by the player
            }
        ]
    }

    Request Type: GET
    Authentication Required: No
    """
    top_users = Leaderboard.objects.order_by('-win_count')[:10]

    result = []
    for top_user in top_users:
        result.append(
            {
                "username": top_user.user.username,
                "win_count": top_user.win_count
            }
        )

    return Response({'leaderboard': result})


@api_view(['POST'])
def register_user(request):
    """
    Registers the user with the given username and password

    Input JSON:
    {
        "username": <username of the user to be created>
        "password": <password of the user to be created>
    }


    Output JSON:

    Success case:
    {
        "response": "User successfully created"
    }

    Error case:
    {
        "error": <Error Message>
    }

    Request Type: POST
    Authentication Required: No
    """
    try:
        username = request.data['username']
        password = request.data['password']
    except KeyError as missing_key:
        return Response({'error': 'Missing key: ' + str(missing_key) + ' in the request'})

    try:
        user = User.objects.create_user(username=username, password=password)
        user.save()
        return Response({'response': 'User successfully created'})
    except IntegrityError as error:
        return Response({'error': 'Username already exists'})
    except BaseException as message:
        return Response({'error': str(message)})


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
def get_user_score(request):
    try:
        user_record = Leaderboard.objects.get(user=request.user)
        return Response({'response': {'win_count': user_record.win_count}})
    except ObjectDoesNotExist:
        return Response({'response': {'win_count': 0}})
