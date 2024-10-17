from django.urls import path
from .views import home_view, getAllProducts, getProduct, getWishlist, addToWishlist, removeFromWishlist, getCategories

urlpatterns = [
    path("", home_view, name="home"),
    path('products/', getAllProducts, name="get-all-products"),
    path('products/<str:pk>', getProduct, name="get-product"),
    path('categories/', getCategories, name="get-categories"),
    path("wishlist/", getWishlist, name="get-wishlist"),
    path("wishlist/add/", addToWishlist, name="add-to-wishlist"),
    path("wishlist/remove/<str:pk>", removeFromWishlist, name="remove-from-wishlist"),
        
]
