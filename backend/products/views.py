from rest_framework import viewsets
from .models import Product, Supplier, ProductCategories, ProductIn, ProductOut
from .serializers import ProductSerializer, SupplierSerializer, ProductCategoriesSerializer, ProductInSerializer, ProductOutSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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
