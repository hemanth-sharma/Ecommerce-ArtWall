from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product, Wishlist, Cart, Category
from .serializers import ProductSerializer, WishlistSerializer, CartSerializer

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
    if category:
        products = products.filter(category=category)

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# Get a single product by its ID. 
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


