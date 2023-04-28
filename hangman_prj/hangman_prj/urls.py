
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('hangman.urls')),
    path('api/', include('hangman.api.urls'))
]
