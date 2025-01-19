from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.conf import settings
import jwt
from api.models import User


class TokenCheckView(APIView):
    def options(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_200_OK)
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
        response['Access-Control-Allow-Headers'] = 'Authorization1, Authorization2, content-type'
        return response
    
    def get(self, request):
        token = request.headers.get('Authorization')

        if token:
            tokens = token.split(" ")
            access_token = tokens[0]  # Access token is the first part
            refresh_token = tokens[1]  # Refresh token is the second part

            try:
                # Try decoding the access token
                decoded_access = jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])
                user = User.objects.get(id=decoded_access['user_id'])
                print("Both are valid")
                
       
                return Response({
                    'valid': True,
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'user': {
                        'id': user.id,
                        'email': user.email,
                    }
                })

            except jwt.ExpiredSignatureError:
              
                try:
                    decoded_refresh = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=["HS256"])
                    user = User.objects.get(id=decoded_refresh['user_id'])

             
                    new_access_token = AccessToken.for_user(user)
                    print("old token",access_token)
                    print("new token",new_access_token)
                    print("access token is invalid but the refresh token is valid")

                    return Response({
                        'valid': True,
                        'access_token': str(new_access_token), 
                        'refresh_token': refresh_token, 
                        'user': {
                            'id': user.id,
                            'email': user.email,
                            'name': user.name or 'User',
                            'username' : user.username
                        }
                    })

                except (jwt.ExpiredSignatureError, jwt.DecodeError):
           
                    print("both are valid tokens")
                    return Response({'valid': False, 'error': 'Both tokens are invalid.'}, status=status.HTTP_401_UNAUTHORIZED)

            except jwt.DecodeError:

                return Response({'valid': False, 'error': 'Invalid access token.'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'valid': False, 'error': 'No token provided.'}, status=status.HTTP_401_UNAUTHORIZED)
