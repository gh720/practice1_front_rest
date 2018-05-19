import datetime

import jwt
import re
from django.conf import settings
from django.contrib.auth import authenticate, login
from rest_framework import generics, status, permissions, exceptions
# from rest_framework.decorators import action
from rest_framework.authentication import get_authorization_header
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework_jwt.settings import api_settings as jwt_settings
from rest_framework_jwt.views import verify_jwt_token

from tourmarks.models import User, Location, Visit
from tourmarks.serializers import UserSerializer

import tourmarks.serializers as srz

class IsOwnerOrReadOnly(permissions.BasePermission):
    '''
    Granting object permissions: a model's object_owner property should match request.user
    '''
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and obj.object_owner == request.user


class UserStatusView(generics.GenericAPIView):
    '''
    user status: authenticated or not { ... status: True } or {... status: False }
    '''
    authentication_classes = ()
    permission_classes=()

    def is_jwt_token_ok(self,request):
        token = get_authorization_header(request).decode('utf-8')
        token = re.sub('^JWT ', '', token) # FIX this
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        username = decoded['username']
        return True

    def get(self, request):
        try:
            if self.is_jwt_token_ok(request):
                return Response({'status': 'success'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status': 'fail', 'exception': str(e)}, status=status.HTTP_200_OK)
        return Response({'status':'fail'}, status=status.HTTP_200_OK)


class UserListView(generics.ListAPIView):
    '''
    List of users ('user_list')
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    '''
    User details ('user_details')
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsOwnerOrReadOnly,  )


class UserCreateView(generics.CreateAPIView):
    '''
    Register a user ('register')
    '''
    authentication_classes = ()
    permission_classes = ()
    queryset = User.objects.all()
    serializer_class = UserSerializer


    def new_token(self, obj):
        jwt_payload_handler = jwt_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = jwt_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_ = serializer.save()
        user = authenticate(username=user_.username, password=request.data.get('password'))
        login(request, user)
        token = self.new_token(user)
        headers = self.get_success_headers(serializer.data)
        data = { **serializer.data }
        data['token']=token
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)


class UserRatioView(generics.RetrieveAPIView):
    '''
    Rating for a user ('users')
    '''
    authentication_classes = ()
    permission_classes = ()
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = srz.UserRatioSerializer(user)
        return Response(serializer.data)

class VisitViewSet(viewsets.ModelViewSet):
    '''
    Endpoints for a visit ('visits')
    '''
    queryset = Visit.objects.all()
    serializer_class = srz.VisitSerializer
    http_method_names = ['get', 'put', 'patch', 'delete']
    permission_classes = (IsOwnerOrReadOnly,)


class LocationViewSet(viewsets.ModelViewSet):
    '''
    Endpoints for a location ('locations')
    '''
    queryset = Location.objects.all()
    serializer_class = srz.LocationSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # @action(methods=['get'], detail=True)
    @list_route(methods=['get'])
    def ratio(self, request, *args, **kwargs):
        '''
        Average rating for a location ('location')
        '''
        location = self.get_object()
        szer = srz.LocationRatioSerializer(location)
        return Response(szer.data)

    # @action(methods=['post'], detail=True)
    @detail_route(methods=['post'])
    def visit(self, request, *args, **kwargs):
        '''
        posting a visit info (/locations/{id}/visit)
        expects: self.request.data to be a json, where rating is a number from 1 to 10:
            { "ratio": rating }
        '''
        user = self.request.user
        location = self.get_object()
        date = datetime.datetime.now()
        visit = Visit.objects.create(**dict(user=user, location=location, date=date, ratio=0))
        serializer = srz.VisitSerializer(visit, data=self.request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
Запросы:
| endpoint | GET | POST | PUT|PATCH | DELETE |
|:---------------------:|:-----------------------------------------------------------:|:-------------------------:|:---------:|:--------:
|
| /register | - | Регистрация пользователя | - | - |
| /sign_in | - | Авторизация пользователя | - | - |
| /users | Список пользователей | - | - | - |
| /users/<id> | Информация о пользователе | - | Изменение | Удаление |
| /locations | Список достопримечательностей | Создание нового места | - | - |
| /locations/<id> | Информация о достопримечательности | - | Изменение | Удаление |
| /locations/<id>/visit | - | Отметиться в данном месте | - | - |
| /locations/<id>/ratio | Получение информации о текущих рейтингах | - | - | - |
| /visits | Список посещений | - | - | - |
| /visits/<id> | Информация о посещении | - | Изменение | Удаление |
| /users/<id>/ratio | Информация о посещениях пользователя и поставленных оценках | - | - | - |
Примеры запросов:
post /locations/<id>/visit BODY {"ratio": 6} (все остальные данные собираются автоматом, дата 
текущая, пользоватил - кто отправил запрос, место определено в endpoint`е)
get /users/<id>/ratio RESPONSE {"count": 17, "avg": 6.7, "locations": [{"id": 1, ...}, ...]}
get /locations/<id>/ratio RESPONSE {"count": 5, "avg": 8.7, "visitors": [{"id": 1, ...}, ...]}
'''
