from rest_framework import serializers
from .models import Expense, ExpenseCategories


class ExpensesTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategories
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    expense_category_name = serializers.SerializerMethodField()  

    def get_expense_category_name(self, obj):
        return obj.expense_category.name  

    class Meta:
        model = Expense
        fields = '__all__' 
