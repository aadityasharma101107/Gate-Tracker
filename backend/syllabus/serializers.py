from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Branch, Subject, Topic

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


