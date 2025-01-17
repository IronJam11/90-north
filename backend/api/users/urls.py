
from django.contrib import admin
from django.urls import path,include
from api.users.views.auth import Register,LoginView,LogoutView



urlpatterns = [
    # auth urls
    path('register/',Register.as_view(),name="register"),
    path('login/',LoginView.as_view(),name="login"),
    path('logout/',LogoutView.as_view(),name="logout"),
]

