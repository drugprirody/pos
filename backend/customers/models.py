from django.db import models

class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True)