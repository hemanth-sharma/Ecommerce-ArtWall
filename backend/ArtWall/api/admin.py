from django.contrib import admin
from .models import Product, Wishlist, Cart, Category, ProductCategory

# Register your models here.
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(ProductCategory)
admin.site.register(Wishlist)
admin.site.register(Cart)


