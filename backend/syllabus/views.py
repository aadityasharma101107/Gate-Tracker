from rest_framework import status, generics, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import BranchDetailSerializer, SubjectSerializer, TopicSerializer
from rest_framework.permissions import AllowAny
from django.http import HttpResponse
from .models import Branch, Subject, Topic




# def index(request):
#     branch_list = Branch.objects.order_by("code")
#     output = ", ".join([q.name for q in branch_list])
#     return HttpResponse(output)


# def branch(request, code):
#     return HttpResponse("you're looking at branch %s" % code)

# def subjects(request, code):
#     response = "you're looking for subjects %s."
#     return HttpResponse(response % code)

# def topics(request, code):
#     return HttpResponse("you're looking for topics %s." % code)

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchDetailSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset= Subject.objects.all()
    serializer_class = SubjectSerializer

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    
