from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import jwt
from django.conf import settings
from api.models import User
from django.core.files.storage import default_storage
from rest_framework.decorators import api_view
from api.users.utils import get_userdetails_from_token


class GetUserFromTokenView(APIView):

    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header is None or not auth_header.startswith('Bearer '):
            return Response({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)
        token = auth_header.split(' ')[1] 
        user_details = get_userdetails_from_token(token)
        if 'error' in user_details:  # Check for any error messages
            return Response(user_details, status=status.HTTP_400_BAD_REQUEST)
        return Response(user_details, status=status.HTTP_200_OK)






  