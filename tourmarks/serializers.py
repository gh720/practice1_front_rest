from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from tourmarks.models import User, Visit, Location


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name'
            , 'gender', 'birth_date', 'country', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name'
            , 'gender', 'birth_date', 'country']

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password and not instance.check_password(password):  # if password is not the same
            instance.set_password(password)
            update_session_auth_hash(self.context.get('request'), instance)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class VisitSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Visit
        fields = ['id', 'user', 'location', 'date', 'ratio']
        extra_kwargs = {'user': {'read_only': True}, 'date': {'read_only': True}}


class VisitWithNamesSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username")
    location = serializers.CharField(source="location.name")

    class Meta:
        model = Visit
        fields = ['id', 'user', 'location', 'date', 'ratio']
        extra_kwargs = {'user': {'read_only': True}}


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'country', 'city', 'name', 'description']


class UserRatioSerializer(serializers.Serializer):

    def to_representation(self, instance):
        qs = Visit.objects.filter(user=instance).select_related('location')
        stats = dict(count=0, avg=0, locations=[])
        rating_sum = 0
        for item in qs:
            stats['count'] += 1
            rating_sum += item.ratio
            stats['locations'].append(LocationSerializer(item.location).data)
        if stats['count'] > 0:
            stats['avg'] = rating_sum / stats['count']
        return stats


class LocationRatioSerializer(serializers.Serializer):

    def to_representation(self, instance):
        qs = Visit.objects.filter(location=instance).select_related('user')
        stats = dict(count=0, avg=0, visitors=[])
        rating_sum = 0
        for item in qs:
            stats['count'] += 1
            rating_sum += item.ratio
            stats['visitors'].append(UserSerializer(item.user).data)
        if stats['count'] > 0:
            stats['avg'] = rating_sum / stats['count']
        return stats
