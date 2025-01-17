import jwt
from django.conf import settings
from api.models import User
from django.http import JsonResponse

def get_userdetails_from_token(token):
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        id = decoded_token.get('user_id') 
        user = User.objects.get(id = id)
        user_details = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "username": user.username,
            "bio":user.bio,
            "name":user.name,
        }
        if user:
            return user_details
        else:
            return {'error': 'Invalid token: Enrollment number not found'}

    except jwt.ExpiredSignatureError:
        return {'error': 'Token has expired'}
    except jwt.DecodeError:
        return {'error': 'Error decoding token'}
