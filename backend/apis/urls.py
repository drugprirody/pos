# apis/urls.py

from django.urls import path, include

urlpatterns = [
    path('customers/', include('customers.urls')),
    path('categories/', include('categories.urls')),
    path('suppliers/', include('suppliers.urls')),
    path('expenses/', include('expenses.urls')),
]
