from django.db import models

class ExpenseCategories(models.Model):
    name = models.CharField(max_length=255)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Expense(models.Model):
    expense_category = models.ForeignKey(ExpenseCategories, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.expense_category.name}: {self.total}"