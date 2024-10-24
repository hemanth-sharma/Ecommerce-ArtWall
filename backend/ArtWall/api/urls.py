from django.urls import path
from .views import MyTokenObtainPairView, ActivateAccountView, registerUser, getUsers, home_view, getUserProfile, getAllProducts, getProduct, getWishlist, addToWishlist, removeFromWishlist, getCategories, searchProducts
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("", home_view, name="home"),
    path('products/', getAllProducts, name="get-all-products"),
    path('product/<str:pk>', getProduct, name="get-product"),
    path('search/', searchProducts, name="search-products"),
    path('categories/', getCategories, name="get-categories"),
    path("wishlist/", getWishlist, name="get-wishlist"),
    path("wishlist/add/", addToWishlist, name="add-to-wishlist"),
    path("wishlist/remove/<str:pk>", removeFromWishlist, name="remove-from-wishlist"),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("users/profile/", getUserProfile, name="get-user-profile"),
    path("users/", getUsers, name="get-users"),
    path("users/register/", registerUser, name="register-user"),
    path("activate/<uidb64>/<token>", ActivateAccountView.as_view(), name="activate"),
]



# urlpatterns = [
#     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]
