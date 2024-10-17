from django.core.management.base import BaseCommand
from api.models import Product, Category, ProductCategory, Wishlist, Cart

class Command(BaseCommand):
    help = 'Clear all records from the database'

    def handle(self, *args, **kwargs):
        ProductCategory.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        Wishlist.objects.all().delete()
        Cart.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('All records cleared successfully!'))
