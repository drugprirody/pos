from django.db import models

class ExpenseType(models.Model):
    name = models.CharField(max_length=50)
    comment = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Expense(models.Model):
    expence_type_id = models.ForeignKey(ExpenseType,  on_delete=models.CASCADE)
    total = models.IntegerField()
    payed = models.IntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)