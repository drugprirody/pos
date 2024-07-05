from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import ProductIn, ProductOut, Sale

@receiver(post_save, sender=ProductIn)
def update_product_on_productin_create(sender, instance, created, **kwargs):
    if created:
        product = instance.product
        product.retail_price = instance.price_per_unit
        product.stock_quantity += instance.quantity
        product.save()

@receiver(post_save, sender=ProductOut)
def update_product_on_productout_create(sender, instance, created, **kwargs):
    if created:
        product = instance.product
        product.stock_quantity -= instance.quantity
        product.save()

@receiver(pre_save, sender=Sale)
def update_customer_balance_on_payment(sender, instance, **kwargs):
    if instance.pk:
        previous_sale = Sale.objects.get(pk=instance.pk)
        amount_paid = instance.paid_amount - previous_sale.paid_amount
        instance.customer.balance += amount_paid
        instance.customer.save()
