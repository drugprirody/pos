from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, ExpenseTypeViewSet, TotalExpensesLastNDays  # Assuming views.py is in the same directory

router = DefaultRouter()
router.register(r'type', ExpenseTypeViewSet)  # Endpoint for expense types
router.register(r'', ExpenseViewSet)  # Explicit endpoint for expenses

urlpatterns = [
    path('', include(router.urls)),
    path('sum-period/<int:days>/', TotalExpensesLastNDays.as_view(), name='total-expenses-last-n-days'),
]