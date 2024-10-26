from rest_framework import serializers
from .models import Category, Product, ProductCategory, Wishlist, Cart
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


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


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get_name(self, obj):
        firstname = obj.first_name 
        lastname = obj.last_name
        name = firstname + " " + lastname
        if name == '' or name == " ":
            name = obj.email

        return name
    
    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

