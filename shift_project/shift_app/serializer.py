from rest_framework import serializers
from models import Manager, Worker

class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ('person', 'joined_at', 'quiter_at', 'manager')

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = ('person', 'department', 'joined_at', 'quited_at')
