from django.shortcuts import render, redirect
from .models import Game
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .forms import GameForm, LoginForm
from .words import words
from .utils import get_word
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout



# Create your views here.

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                form.add_error(None, 'Invalid username or password.')
    else:
        form = LoginForm()

    return render(request, 'login_view.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('login_view')


def home(request):
    user = request.user
    if request.user.is_authenticated:
        if request.method == 'POST':
            word = get_word(words)
            game = Game.objects.create(word=word, user=user)
            return render (request, 'game.html', {'game':game})
        else:
            return render(request,'home.html')
    else:
        return redirect('login_view')

