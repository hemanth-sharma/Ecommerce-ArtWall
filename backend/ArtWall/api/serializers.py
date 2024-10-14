# from rest_framework import serializers
# from .models import Product, Wishlist, Cart # , Category

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

# class WishlistSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Wishlist
#         fields = '__all__'

# class CartSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = '__all__'



from rest_framework import serializers
from .models import Category, Product, ProductCategory, Wishlist, Cart

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['_id', 'category']

class ProductCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()  # to display full category details

    class Meta:
        model = ProductCategory
        fields = ['category']

class ProductSerializer(serializers.ModelSerializer):
    categories = ProductCategorySerializer(source='productcategory_set', many=True)  # Many-to-many relation

    class Meta:
        model = Product
        fields = ['_id', 'name', 'description', 'rating', 'reviews_count', 'in_stock', 'image', 'price', 'categories']

class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Wishlist
        fields = ['user', 'product']

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Cart
        fields = ['user', 'product', 'quantity']
