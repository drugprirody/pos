from rest_framework import serializers
from .models import Product, Supplier, ProductCategories, ProductIn, ProductOut

class ProductCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategories
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    # product_typ_name = 
    class Meta:
        model = Product
        fields = '__all__'

class ProductInSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductIn
        fields = '__all__'

class ProductOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOut
        fields = '__all__'
