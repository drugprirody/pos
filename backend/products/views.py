from rest_framework import viewsets
from .models import Product, Supplier, ProductCategories, ProductIn, ProductOut
from .serializers import ProductSerializer, SupplierSerializer, ProductCategoriesSerializer, ProductInSerializer, ProductOutSerializer

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
