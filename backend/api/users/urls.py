
from django.contrib import admin
from django.urls import path,include
from api.users.views.auth import Register,LoginView,LogoutView
from api.users.views.userdetails import GetUserFromTokenView
from api.users.views.allusers import get_all_users



urlpatterns = [
    # auth urls
    path('register/',Register.as_view(),name="register"),
    path('login/',LoginView.as_view(),name="login"),
    path('logout/',LogoutView.as_view(),name="logout"),
    path('user-details/',GetUserFromTokenView.as_view(),name="user-details"),
    path('all-users/', get_all_users,name="all-users"),
]

