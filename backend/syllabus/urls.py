from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BranchViewSet, SubjectViewSet, TopicViewSet

router = DefaultRouter()
router.register(r'branches', BranchViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'topics', TopicViewSet)

urlpatterns = [
    path('', include(router.urls)),
]