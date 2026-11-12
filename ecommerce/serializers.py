from django.contrib.auth.models import User
from rest_framework import serializers


class SignupSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User

        fields = [
            'username',
            'email',
            'password',
            'confirm_password',
        ]

    def validate(self, data):

        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                'confirm_password':
                'Passwords do not match.'
            })

        if User.objects.filter(
            email=data['email']
        ).exists():

            raise serializers.ValidationError({
                'email':
                'Email already registered.'
            })

        return data

    def create(self, validated_data):

        validated_data.pop(
            'confirm_password'
        )

        password = validated_data.pop(
            'password'
        )

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user