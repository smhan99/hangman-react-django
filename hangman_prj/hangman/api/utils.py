
def is_started(game):
    if not game.is_started:
        game.is_started = True
        game.save()



def make_guess(game, guess):
    if guess not in game.guesses and game.remaining_guesses > 0:
        game.guesses += guess
        if guess in game.word:
            game.remaining_guesses -= 1
            if set(game.word).issubset(set(game.guesses)):
                game.is_over = True
                game.is_winner = True
        else:
            game.remaining_guesses -= 1
            if game.remaining_guesses == 0:
                game.is_over = True
        game.save()
        return True
    else:
        return False  



def check_game_state(game):
    if set(game.word).issubset(set(game.guesses)):
        game.is_over = True
        game.is_winner = True
    elif game.remaining_guesses == 0:
        game.is_over = True
    game.save()
