from django.db import models

class Supplier(models.Model):
    company_name = models.CharField(max_length=255)
    contact_person_name = models.CharField(max_length=255)
    contact_phone = models.CharField(max_length=20)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.company_name


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    stock_quantity = models.IntegerField(default=0)
    retail_price = models.DecimalField(max_digits=10, decimal_places=2)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class ProductIn(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"In: {self.product.name} from {self.supplier.company_name}"


class ProductOut(models.Model):
    MOVEMENT_STATUS_CHOICES = [
        ('sold', 'Sold'),
        ('writeoff', 'Writeoff'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    movement_status = models.CharField(max_length=8, choices=MOVEMENT_STATUS_CHOICES)
    quantity = models.IntegerField()
    sale_id = models.IntegerField()  # Assumed integer, adjust if needed
    price_per_one = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Out: {self.product.name} - {self.get_movement_status_display()}"
