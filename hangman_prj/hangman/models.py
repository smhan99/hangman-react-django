from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import uuid



class Game(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    game_id = models.UUIDField(default=uuid.uuid4, editable=False)
    word = models.CharField(max_length=20)
    guesses = models.CharField(max_length=100, default='')
    max_guesses = models.PositiveIntegerField(default=5)
    remaining_guesses = models.PositiveIntegerField(default=5)
    is_started = models.BooleanField(default=False)
    is_over = models.BooleanField(default=False)
    is_winner = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.word} - {self.user}"



class Leaderboard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard')
    win_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} -  {self.win_count}"