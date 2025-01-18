from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
import redis
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import time
from api.models import User
from api.users.utils import get_userdetails_from_token
from rest_framework.response import Response
from rest_framework import status

redis_instance = redis.Redis(**settings.REDIS_CONFIG)

@csrf_exempt
@require_http_methods(["POST"])
def store_chat_message(request):
    try:
        auth_header = request.headers.get('Authorization')
        if auth_header is None or not auth_header.startswith('Bearer '):
            return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)
        token = auth_header.split(' ')[1] 
        user_details = get_userdetails_from_token(token)
        print("userdetails", user_details)
        data = json.loads(request.body)
        room = data.get('room')
        username = user_details['username']
        body = data.get('body')
        if room and username and body:
            message = {
                'username': username,
                'body': body,
                'timestamp': time.time()
            }
            
            redis_instance.lpush(room, json.dumps(message).encode('utf-8'))
            return JsonResponse({'message': 'Message stored successfully'})
        
        return HttpResponseBadRequest('Invalid data. Provide room, user, and body.')
    
    except json.JSONDecodeError:
        return HttpResponseBadRequest('Invalid JSON format')

@require_http_methods(["GET"])
def get_chat_messages(request, room):
    messages = redis_instance.lrange(room, 0, -1) 
    if messages:
        return JsonResponse({
            'room': room,
            'messages': [json.loads(m.decode('utf-8')) for m in reversed(messages)]
        })
    return JsonResponse({'message': 'No messages found'}, status=404)

@require_http_methods(["DELETE"])
@csrf_exempt
def delete_all_messages(request, room):
    # Check if the room exists in Redis
    if redis_instance.exists(room):
        redis_instance.delete(room)  
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'chat_{room}', 
            {
                'type': 'delete_messages_event',
                'message': 'All messages have been deleted'
            }
        )
        
        return JsonResponse({'message': f'All messages in room "{room}" have been deleted successfully'})
    
    return HttpResponseNotFound(f'Room "{room}" not found')


@require_http_methods(["GET"])
def get_latest_messages(request, room, count=10):
    messages = redis_instance.lrange(room, 0, count - 1) 
    if messages:
        return JsonResponse({
            'room': room,
            'messages': [json.loads(m.decode('utf-8')) for m in messages]
        })
    
    return JsonResponse({'message': 'No messages found'}, status=404)
