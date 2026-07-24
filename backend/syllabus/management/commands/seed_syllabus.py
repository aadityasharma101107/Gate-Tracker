import json
import os
from django.core.management.base import BaseCommand
from syllabus.models import Branch, Subject, Topic  # Replace tracker_app with your app name

class Command(BaseCommand):
    help = "Seeds the database with the complete GATE CS syllabus"

    def handle(self, *args, **kwargs):
        # Locate the JSON file relative to this python script
        current_dir = os.path.dirname(__file__)
        json_file_path = os.path.join(current_dir, 'gate_cs_syllabus.json')

        if not os.path.exists(json_file_path):
            self.stderr.write(self.style.ERROR(f"JSON file not found at {json_file_path}"))
            return

        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        # 1. Get or Create the Branch
        branch, _ = Branch.objects.get_or_create(name=data['branch'])

        # 2. Loop through subjects and topics
        for sub_data in data['subjects']:
            subject, _ = Subject.objects.get_or_create(branch=branch, name=sub_data['name'])
            
            for topic_name in sub_data['topics']:
                Topic.objects.get_or_create(subject=subject, name=topic_name)

        self.stdout.write(self.style.SUCCESS("GATE CS Syllabus seeded into database successfully!"))