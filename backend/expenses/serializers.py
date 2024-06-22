from rest_framework import serializers
from .models import Expenses, ExpensesType


class ExpensesTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpensesType
        fields = '__all__'


class ExpensesSerializer(serializers.ModelSerializer):
    expense_type_name = serializers.SerializerMethodField()  

    def get_expense_type_name(self, obj):
        return obj.expense_type.name  

    class Meta:
        model = Expenses
        fields = '__all__' 
