import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest
from asgiref.sync import sync_to_async
from api.users.utils import get_userdetails_from_token
from api.models import User
import time
import redis

redis_instance = redis.Redis(**settings.REDIS_CONFIG)

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print("WebSocket connect request received.")
        try:
            self.username1 = self.scope['url_route']['kwargs']['username1']
            self.username2 = self.scope['url_route']['kwargs']['username2']
            print(f"Usernames: username1={self.username1}, username2={self.username2}")

 
            self.room_name = f'{min(self.username1, self.username2)}_{max(self.username1, self.username2)}'
            self.room_group_name = f'chat_{self.room_name}'
            print(f"Room name: {self.room_name}, Room group name: {self.room_group_name}")

    
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
            print("WebSocket connection accepted.")
        except Exception as e:
            print(f"Error during WebSocket connection: {e}")

    async def disconnect(self, close_code):
        print(f"WebSocket disconnect request received with close_code={close_code}.")
        try:
            # Leave room group
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
            print("WebSocket disconnected.")
        except Exception as e:
            print(f"Error during WebSocket disconnection: {e}")

    async def receive(self, text_data):
        print(f"Data received in WebSocket: {text_data}")
        try:
            data = json.loads(text_data)
            message = data['message']
            print(f"Parsed message: {message}")

            # Save the message to the database
            await self.save_message(self.room_name, message)

            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'room': self.room_name,
                    'username': self.username1
                }
            )
            print(f"Message sent to group: {self.room_group_name}")
        except json.JSONDecodeError:
            print("Failed to decode JSON message.")
        except Exception as e:
            print(f"Error receiving message: {e}")

    async def chat_message(self, event):
        message = event['message']

        try:
            await self.send(text_data=json.dumps({
                'message': message,
                'username': event['username']
            }))

        except Exception as e:
            print(f"Error broadcasting message: {e}")

    async def delete_messages_event(self, event):

        try:
            await self.send(text_data=json.dumps({
                'action': 'delete_messages',
                'message': 'All messages in the room have been deleted'
            }))
            print("Delete messages event sent.")
        except Exception as e:
            print(f"Error sending delete messages event: {e}")

    @sync_to_async
    def save_message(self, room, content):
        print(f"Saving message to room: {room}, content: {content}")
        try:
            message = {
                'content': content,
                'timestamp': time.time()
            }
            redis_instance.lpush(room, json.dumps(message))
            print("Message stored in Redis successfully.")
            return JsonResponse({'message': 'Message stored successfully'})
        except json.JSONDecodeError:
            print("Invalid JSON format while saving message.")
            return HttpResponseBadRequest('Invalid JSON format')
        except Exception as e:
            print(f"Error saving message: {e}")
            return HttpResponseBadRequest('Error saving message')
