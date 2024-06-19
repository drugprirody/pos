from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpensesViewSet, ExpensesTypeViewSet  # Assuming views.py is in the same directory

router = DefaultRouter()
router.register(r'type', ExpensesTypeViewSet)  # Endpoint for expense types
router.register(r'', ExpensesViewSet)  # Explicit endpoint for expenses

urlpatterns = [
    path('', include(router.urls)),
]