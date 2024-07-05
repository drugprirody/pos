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
    product_category_name =  serializers.SerializerMethodField()
    product_supplier_company_name = serializers.SerializerMethodField()

    def get_product_category_name(self, obj):
        return obj.category.name 
    
    def get_product_supplier_company_name(self, obj):
        return obj.supplier.company_name 
    
    class Meta:
        model = Product
        fields = '__all__'

class ProductInSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    supplier_name = serializers.SerializerMethodField()

    
    def get_supplier_name(self, obj):
        return obj.supplier.company_name
    

    def get_product_name(self, obj):
        return obj.product.name
    
    
    class Meta:
        model = ProductIn
        fields = '__all__'

class ProductOutSerializer(serializers.ModelSerializer):
    movement_status_name = serializers.CharField(source='get_movement_status_display', read_only=True)
    product_name = serializers.SerializerMethodField()
    sum_of_losses = serializers.SerializerMethodField()

    def get_product_name(self, obj):
        return obj.product.name
    

    def get_sum_of_losses(self, obj):
        return obj.quantity * obj.retail_price

    class Meta:
        model = ProductOut
        fields = '__all__'
