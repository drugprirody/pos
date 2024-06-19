from rest_framework import serializers
from .models import Expense, ExpenseType


class ExpenseTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseType
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    expence_type_name = serializers.SerializerMethodField()  

    def get_expence_type_name(self, obj):
        return obj.expence_type_id.name  

    class Meta:
        model = Expense
        fields = '__all__' 
