from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    _id = models.AutoField(primary_key=True,  editable=False)
    category = models.CharField(max_length=255, unique=True)

    def __str__(self) -> str:
        return self.name
    

class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=8, decimal_places=1, null=True, blank=True)
    reviews_count = models.IntegerField(null=True,blank=True,default=0)
    in_stock = models.BooleanField(default=True)
    image = models.ImageField(upload_to='products/', null=True,blank=True)
    price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    # category = models.CharField(max_length=100)
    # category = models.ForeignKey(Category, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category, through='ProductCategory')
    def __str__(self):
        return self.name

class ProductCategory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # products = models.ManyToManyField(Product, through='CartItem')


# class CartItem(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)