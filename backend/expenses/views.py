from rest_framework import viewsets
from .models import Expense, ExpenseType
from .serializers import ExpenseSerializer, ExpenseTypeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from django.db import models

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class ExpenseTypeViewSet(viewsets.ModelViewSet):
    queryset = ExpenseType.objects.all()
    serializer_class = ExpenseTypeSerializer


class TotalExpensesLastNDays(APIView):
    def get(self, request, days):
        end_date = timezone.now()
        start_date = end_date - timedelta(days=days)
        expenses = Expense.objects.filter(created_at__range=[start_date, end_date])
        total_expense = expenses.aggregate(total=models.Sum('total'))['total'] or 0
        return Response({'total_expense': total_expense})
