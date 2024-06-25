from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ProductIn

@receiver(post_save, sender=ProductIn)
def update_product_on_productin_create(sender, instance, created, **kwargs):
    if created:
        product = instance.product
        product.retail_price = instance.price_per_unit
        product.stock_quantity += instance.quantity
        product.save()