from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, SupplierViewSet, ProductCategoriesViewSet, ProductInViewSet, ProductOutViewSet, CalculateTurnoverView, CalculateProductOutTotalPeriodView

router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet)
router.register(r'categories', ProductCategoriesViewSet)
router.register(r'in', ProductInViewSet, basename='productin')
router.register(r'out', ProductOutViewSet, basename='productout')
router.register(r'', ProductViewSet)

urlpatterns = [
    path('turnover/', CalculateTurnoverView.as_view(), name='calculate-turnover'),
    path('products_loss/sum-period/<int:days>/', CalculateProductOutTotalPeriodView.as_view(), name='calculate-product-out-total-period'),
    path('', include(router.urls)),
]
