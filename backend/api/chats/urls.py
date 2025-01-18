# chat/urls.py
from django.urls import path
from api.chats.views import dm_views

urlpatterns = [
    path('store/',dm_views.store_chat_message, name='store_chat_message'),
    path('get/<str:room>/', dm_views.get_chat_messages, name='get_chat_messages'),
    path('latest/<str:room>/<int:count>/', dm_views.get_latest_messages, name='get_latest_messages'),
    path('delete/<str:room>/',dm_views.delete_all_messages, name="delete-messages"),
]
