from django.db import models

# Create your models here.
class Supplier(models.Model):
    id = models.AutoField(primary_key=True)
    company_name =  models.CharField(max_length=100) # Ak yol
    contact_person_name = models.CharField(max_length=50) # Myratgeli Akaltynow
    contact_phone = models.CharField(max_length=12) # +99365582928
    comment = models.TextField(blank=True)
