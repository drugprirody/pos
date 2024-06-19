from django.db import models

class ExpensesType(models.Model):
    name = models.CharField(max_length=50)
    comment = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Expenses(models.Model):
    expence_type_id = models.ForeignKey(ExpensesType, on_delete=models.CASCADE)
    total = models.IntegerField()
    comment = models.TextField(blank=True)