import random
import uuid
from django.core.exceptions import ObjectDoesNotExist

from .words import words
from .models import Game


def get_word(options):
    word = random.choice(options)
    return word.upper()


def get_word():
    word = random.choice(words)
    return word.upper()


def create_game(user, word=''):
    if word == '':
        word = get_word()

    # Keep trying new UIDs until you find one with no game object
    try:
        while True:
            game_uid = uuid.uuid4()
            Game.objects.get(game_id=game_uid)
    except ObjectDoesNotExist:
        new_game = Game(created_by=user, word=word)
        new_game.save()
        return new_game
