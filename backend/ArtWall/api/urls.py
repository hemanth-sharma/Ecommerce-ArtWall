from django.urls import path
from .views import home_view, getAllProducts, getProduct
urlpatterns = [
    path("", home_view, name="home"),
    path('products/', getAllProducts, name="get-all-products"),
    path('products/<str:pk>', getProduct, name="get-product")
    
]
