from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product, Wishlist, Cart, Category
from .serializers import ProductSerializer, WishlistSerializer, CategorySerializer, CartSerializer
from django.db.models import Q
from rest_framework import status

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.permissions import IsAuthenticated,IsAdminUser
# from django.contrib.auth.models import User
# from django.contrib.auth.hashers import make_password
# from rest_framework import status

# # for sending mails and generate token
# from django.template.loader import render_to_string
# from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
# from .utils import TokenGenerator,generate_token
# from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
# from django.core.mail import EmailMessage
# from django.conf import settings
# from django.views.generic import View

@api_view(['GET'])
def home_view(request):
    return HttpResponse("Welcome to ArtWell API in django-restframework.")


# Get all products filtered by category.
@api_view(['GET'])
def getAllProducts(request):
    products = Product.objects.all()
    category = request.GET.get('category', None)
    print(category)
    if category:
        # products = products.filter(category=category)
        products = products.filter(
            Q(productcategory__category__category__iexact=category)
        )

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# Get a single product by its ID. 
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# Get all categories.
@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def searchProducts(request):
    query = request.GET.get('query', '')
    
    if query:
        products = Product.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(productcategory__category__category__icontains=query)
        ).distinct()
    else:
        products = Product.objects.all()
    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# Get Wishlist Items of user
@api_view(['GET'])
def getWishlist(request):
    wishlist_items = Wishlist.objects.filter(user=request.user)
    serializer = WishlistSerializer(wishlist_items, many=True)
    return Response(serializer.data)


# Add a product to the user's wishlist
@api_view(['POST'])
def addToWishlist(request):
    product_id = request.data.get('product_id')
    try:
        product = Product.objects.get(_id=product_id)
        wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)
        if created:
            return Response({"detail": "Product added to wishlist"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Product is already in the wishlist"}, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)


# Remove a product from the user's wishlist
@api_view(['DELETE'])
def removeFromWishlist(request, pk):
    try:
        wishlist_item = Wishlist.objects.get(_id=pk, user=request.user)
        wishlist_item.delete()
        return Response({"detail": "Product removed from wishlist"}, status=status.HTTP_204_NO_CONTENT)
    except Wishlist.DoesNotExist:
        return Response({"detail": "Wishlist item not found"}, status=status.HTTP_404_NOT_FOUND)
    
