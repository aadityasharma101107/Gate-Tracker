from rest_framework import status, generics, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import BranchDetailSerializer, SubjectSerializer, TopicSerializer
from rest_framework.permissions import AllowAny
from django.http import HttpResponse
from .models import Branch, Subject, Topic
from rest_framework.views import APIView;
from .serializers import StudentRegistrationSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    
class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchDetailSerializer

class SyllabusView(viewsets.ModelViewSet):
    queryset= Subject.objects.all()
    serializer_class = SubjectSerializer

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    
class RegisterStudentView(APIView):
    """
    POST /api/students/register/
    Registers a new student along with their login account.
    """
 
    permission_classes = [AllowAny]
    authentication_classes = []  # no auth needed to sign up
 
    def post(self, request):
        serializer = StudentRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = serializer.save()
 
        return Response(
            {
                "message": "Registration successful.",
                "student": {
                    "id": student.id,
                    "name": student.full_name,
                    "email": student.user.email,
                    "dob": student.dob,
                    "branch": student.get_branch_display(),
                    "gate_target_year": student.gate_target_year,
                },
            },
            status=status.HTTP_201_CREATED,
        )
 
 
