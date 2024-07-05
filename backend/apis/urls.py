# apis/urls.py

from django.urls import path, include

urlpatterns = [
    path('customers/', include('customers.urls')),
    path('products/', include('products.urls')),
    path('expenses/', include('expenses.urls')),
]
