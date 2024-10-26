from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Product, Wishlist, Cart, Category
from .serializers import ProductSerializer, WishlistSerializer, CategorySerializer, CartSerializer, UserSerializer, UserSerializerWithToken


from django.db.models import Q
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# imports to send emails.
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View


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
    

# views.py

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCartItems(request):
    cart_items = Cart.objects.filter(user=request.user)
    serializer = CartSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Only allow authenticated users to access this endpoint
def addToCart(request):
    product_id = request.data.get('product_id')
    try:
        product = Product.objects.get(_id=product_id)
        cart_item, created = Cart.objects.get_or_create(user=request.user, product=product)
        if created:
            return Response({"detail": "Product added to cart"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Product is already in the cart"}, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeFromCart(request, pk):
    try:
        cart_item = Cart.objects.get(_id=pk, user=request.user)
        cart_item.delete()
        return Response({"detail": "Product removed from cart"}, status=status.HTTP_204_NO_CONTENT)
    except Cart.DoesNotExist:
        return Response({"detail": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)




@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def registerUser(request):
    data = request.data
    try: 
        user = User.objects.create(
            first_name=data["fname"], 
            last_name=data["lname"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"]),
            is_active=True ## Activating here to avoid verification process.
        )
        ## 
        # # Send email to user to verify account
        # email_subject = "Activate Your Account"
        # message = render_to_string(
        #     "activate.html",
        #     {
        #         "user": user,
        #         "domain": "127.0.0.1:8000",
        #         "uid": urlsafe_base64_encode(force_bytes(user.pk)),
        #         "token": generate_token.make_token(user)
        #     }
        # )
        # print(message)
        # ## 
        # email_message = EmailMessage(email_subject, message, settings.EMAIL_HOST_USER, [data["email"]])
        # email_message.send()
        ##
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e: 
        message = {"details": "User already exists"}
        print(e)
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception as identifier:
            user = None
        
        if user is not None and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            return render(request,"activatesuccess.html")
        else:
            return render(request,"activatefailed.html")
        

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        
        return data

    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

