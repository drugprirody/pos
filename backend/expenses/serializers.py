from rest_framework import serializers
from .models import Expenses, ExpensesType


class ExpensesTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpensesType
        fields = '__all__'


class ExpensesSerializer(serializers.ModelSerializer):
    expence_type_name = serializers.SerializerMethodField()  

    def get_expence_type_name(self, obj):
        return obj.expence_type_id.name  

    class Meta:
        model = Expenses
        fields = '__all__' 
