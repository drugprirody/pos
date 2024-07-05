from django.db import models
from customers.models import Customer
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

class Supplier(models.Model):
    company_name = models.CharField(max_length=255)
    contact_person_name = models.CharField(max_length=255)
    contact_phone = models.CharField(max_length=20)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.company_name


class ProductCategories(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(ProductCategories, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    stock_quantity = models.IntegerField(default=0)
    retail_price = models.DecimalField(max_digits=10, decimal_places=2)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    comment = models.TextField(blank=True, null=True)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)

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
        ('defective', 'Брак'),
        ('writeoff', 'Списано'),
        ('home', 'Домой'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    movement_status = models.CharField(max_length=9, choices=MOVEMENT_STATUS_CHOICES)
    quantity = models.IntegerField()
    retail_price = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Out: {self.product.name} - {self.get_movement_status_display()}"


class Sale(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Sale to {self.customer.firstname} {self.customer.lastname} on {self.created_at}"

    def add_payment(self, amount):
        self.paid_amount += amount
        self.save()
        self.customer.balance += amount
        self.customer.save()


class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at which product is sold
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} for sale {self.sale.id}"

    # Update product stock quantity when a SaleItem is created
    @staticmethod
    def post_save(sender, instance, created, **kwargs):
        if created:
            product = instance.product
            product.stock_quantity -= instance.quantity
            product.save()

models.signals.post_save.connect(SaleItem.post_save, sender=SaleItem)

# Update Sale total_price when SaleItem is created
@receiver(post_save, sender=SaleItem)
def update_sale_total(sender, instance, **kwargs):
    sale = instance.sale
    sale.total_price = sum(item.sale_price * item.quantity for item in sale.items.all())
    sale.save()
