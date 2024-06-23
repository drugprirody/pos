from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, SupplierViewSet, ProductCategoriesViewSet, ProductInViewSet, ProductOutViewSet

router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet)
router.register(r'categories', ProductCategoriesViewSet)
router.register(r'in', ProductInViewSet, basename='productin')
router.register(r'out', ProductOutViewSet, basename='productout')
router.register(r'', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
