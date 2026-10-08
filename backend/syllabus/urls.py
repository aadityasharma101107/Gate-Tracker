from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BranchViewSet, SyllabusView, TopicViewSet, RegisterStudentView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
# router.register(r'branches', BranchViewSet)
router.register(r'subjects', SyllabusView)
router.register(r'topics', TopicViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('syllabus/', SyllabusView.as_view(), name='syllabus'),
    # path('topics/<int:topic_id>/toggle/', TopicViewSet.as_view(), name='toggle-topic'),
    path('register/', RegisterStudentView.as_view(), name='register_student'),
]