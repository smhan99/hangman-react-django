from django.contrib import admin
from .models import Game, Leaderboard
from django.contrib.auth.models import Group



# Register your models here.
admin.site.unregister(Group)
admin.site.register(Game) 
admin.site.register(Leaderboard) 