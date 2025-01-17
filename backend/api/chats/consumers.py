import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest
from asgiref.sync import sync_to_async
from api.models import User
import time
import redis

redis_instance = redis.Redis(**settings.REDIS_CONFIG)

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.username1 = self.scope['url_route']['kwargs']['username1']
        self.username2 = self.scope['url_route']['kwargs']['username2']

        # Sort usernames alphabetically to create a unique room group name
        self.room_name = f'{min(self.username1, self.username2)}_{max(self.username1, self.username2)}'
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message = data['message']

            # Save the message to the database
            await self.save_message(self.room_name, message)

            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'room': self.room_name,
                }
            )
        except Exception as e:
            print(f"Error receiving message: {str(e)}")

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
        }))

    # Handle message deletion event
    async def delete_messages_event(self, event):
        await self.send(text_data=json.dumps({
            'action': 'delete_messages',
            'message': 'All messages in the room have been deleted'
        }))

    @sync_to_async
    def save_message(self, room, content):
        try:
            message = {
                'content': content,
                'timestamp': time.time()
            }
            redis_instance.lpush(room, json.dumps(message))

            return JsonResponse({'message': 'Message stored successfully'})
        
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON format')
        
        except Exception as e:
            return HttpResponseBadRequest('Error saving message')

