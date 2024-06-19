from rest_framework import viewsets
from .models import Expenses, ExpensesType
from .serializers import ExpensesSerializer, ExpensesTypeSerializer

class ExpensesViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer


class ExpensesTypeViewSet(viewsets.ModelViewSet):
    queryset = ExpensesType.objects.all()
    serializer_class = ExpensesTypeSerializer