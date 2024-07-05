from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, ExpenseCategoriesViewSet, TotalExpenseLastNDays  # Assuming views.py is in the same directory

router = DefaultRouter()
router.register(r'categories', ExpenseCategoriesViewSet)  # Endpoint for expense types
router.register(r'', ExpenseViewSet)  # Explicit endpoint for expenses

urlpatterns = [
    path('', include(router.urls)),
    path('sum-period/<int:days>/', TotalExpenseLastNDays.as_view(), name='total-expenses-last-n-days'),
]