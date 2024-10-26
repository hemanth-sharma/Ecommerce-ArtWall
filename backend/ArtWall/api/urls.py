from django.urls import path
from api import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("", views.home_view, name="home"),
    path('products/', views.getAllProducts, name="get-all-products"),
    path('product/<str:pk>', views.getProduct, name="get-product"),
    path('search/', views.searchProducts, name="search-products"),
    path('categories/', views.getCategories, name="get-categories"),
    path("wishlist/", views.getWishlist, name="get-wishlist"),
    path("wishlist/add/", views.addToWishlist, name="add-to-wishlist"),
    path("wishlist/remove/<str:pk>", views.removeFromWishlist, name="remove-from-wishlist"),
    path('cart/', views.getCartItems, name='get-cart-items'),
    path('cart/add/', views.addToCart, name='add-to-cart'),
    path('cart/remove/<str:pk>/', views.removeFromCart, name='remove-from-cart'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("users/profile/", views.getUserProfile, name="get-user-profile"),
    path("users/", views.getUsers, name="get-users"),
    path("users/register/", views.registerUser, name="register-user"),
    path("activate/<uidb64>/<token>", views.ActivateAccountView.as_view(), name="activate"),
]


