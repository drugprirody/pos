from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, SupplierViewSet, ProductCategoriesViewSet, ProductInViewSet, ProductOutViewSet, CalculateTurnoverView

router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet)
router.register(r'categories', ProductCategoriesViewSet)
router.register(r'in', ProductInViewSet, basename='productin')
router.register(r'out', ProductOutViewSet, basename='productout')
router.register(r'', ProductViewSet)

urlpatterns = [
    path('turnover/', CalculateTurnoverView.as_view(), name='calculate-turnover'),
    path('', include(router.urls)),
]
