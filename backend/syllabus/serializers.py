from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Branch, Subject, Topic
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from .models import Student
from datetime import date
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id','name','importance_level']


class SubjectSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Subject
        fields = ['id','name','code', 'weightage','topics']

class BranchDetailSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True )

    class Meta:
        model = Branch
        fields = ['id','name','code', 'subjects']

User = get_user_model()

class StudentRegistrationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    dob = serializers.DateField()
    branch = serializers.ChoiceField(choices=Student.Branch.choices)
    gate_target_year = serializers.IntegerField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})
    confirm_password = serializers.CharField(
        write_only=True, style={"input_type": "password"}
    )
 
    def validate_email(self, value):
        value = value.lower().strip()
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value
 
    def validate_dob(self, value):
        if value >= date.today():
            raise serializers.ValidationError("Date of birth must be in the past.")
        return value
 
    def validate_gate_target_year(self, value):
        current_year = date.today().year
        if not (current_year <= value <= current_year + 5):
            raise serializers.ValidationError(
                f"Target year must be between {current_year} and {current_year + 5}."
            )
        return value
 
    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )
        # Runs Django's AUTH_PASSWORD_VALIDATORS
        validate_password(attrs["password"])
        return attrs
 
    @transaction.atomic
    def create(self, validated_data):
        validated_data.pop("confirm_password")
        password = validated_data.pop("password")
        email = validated_data.pop("email")
 
        # Email doubles as username (default User model requires a username)
        user = User.objects.create_user(
            username=email, email=email, password=password
        )
        return Student.objects.create(
            user=user,
            full_name=validated_data["name"],
            dob=validated_data["dob"],
            branch=validated_data["branch"],
            gate_target_year=validated_data["gate_target_year"],
        )
 

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['user_id'] = self.user.id 
        return data 
    