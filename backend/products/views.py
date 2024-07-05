from rest_framework import viewsets
from .models import Product, Supplier, ProductCategories, ProductIn, ProductOut
from .serializers import ProductSerializer, SupplierSerializer, ProductCategoriesSerializer, ProductInSerializer, ProductOutSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta

class ProductCategoriesViewSet(viewsets.ModelViewSet):
    queryset = ProductCategories.objects.all()
    serializer_class = ProductCategoriesSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductInViewSet(viewsets.ModelViewSet):
    queryset = ProductIn.objects.all()
    serializer_class = ProductInSerializer

class ProductOutViewSet(viewsets.ModelViewSet):
    queryset = ProductOut.objects.all()
    serializer_class = ProductOutSerializer

class CalculateTurnoverView(APIView):
    """
    API View to calculate total turnover.
    """
    def get(self, request):
        products = Product.objects.all()
        total_turnover = sum(product.retail_price * product.stock_quantity for product in products)
        return Response({'total_turnover': total_turnover}, status=status.HTTP_200_OK)


class CalculateProductOutTotalPeriodView(APIView):
    """
    API View to calculate total for ProductOut for a specified period.
    """
    def get(self, request, days):
        end_date = timezone.now()
        start_date = end_date - timedelta(days=days)
        product_outs = ProductOut.objects.filter(created_at__range=[start_date, end_date])
        total_product_out = sum(product_out.retail_price * product_out.quantity for product_out in product_outs)
        return Response({'total_product_out_period': total_product_out}, status=status.HTTP_200_OK)