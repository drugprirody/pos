from rest_framework import serializers
from .models import Expenses, ExpensesType

class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = '__all__'


class ExpensesTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpensesType
        fields = '__all__'