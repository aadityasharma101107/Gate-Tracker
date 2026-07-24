from django.db import models
from django.contrib.auth.models import User

# This represents the Branch (CS, IT, etc.)
class Branch(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

# This represents the Subject (OS, DBMS, etc.)
class Subject(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='subjects')
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20, blank=True, null=True)
    weightage = models.FloatField(default=0.0, help_text="Average marks weightage in GATE")

    class Meta:
        unique_together = ('branch', 'name')
    
    def __str__(self):
        return self.name

# This represents the specific Topics/Subtopics
class Topic(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='topics')
    name = models.CharField(max_length=255)
    importance_level = models.CharField(
        max_length=10,
        choices=[('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')],
        default='Medium'
    )
    # video_link = models.URLField(blank=True, null=True)
    # article_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

# This tracks if YOU (the user) completed it
class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    theory_completed = models.BooleanField(default=False)
    practice_completed = models.BooleanField(default=False)
    user_note = models.TextField(max_length=500, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'topic')

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    branch = models.CharField(max_length=50, choices=[('CS', 'Computer Science'), ('IT', 'Information Technology'), ('OTHER', 'Other')])
    batch = models.CharField(max_length=10) # e.g., 2022-26

    def __str__(self):
        return self.user.username