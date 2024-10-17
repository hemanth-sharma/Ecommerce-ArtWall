from django.core.management.base import BaseCommand
from api.models import Product, Category, ProductCategory
import json
import random
import os
from django.conf import settings
from django.utils import timezone
import requests
import uuid

class Command(BaseCommand):
    help = 'Import posters data into the database'

    def handle(self, *args, **kwargs):
        json_file_path = os.path.join(settings.BASE_DIR, 'api', 'data', 'poster_data.json')

        with open(json_file_path, 'r') as f:
            poster_data = json.load(f)

        for category_name, posters in poster_data.items():
            # Get or create the category
            category, _ = Category.objects.get_or_create(category=category_name.lower())

            for poster in posters:
                # Get or create the product
                product, created = Product.objects.get_or_create(
                    name=poster['name'],
                    defaults={
                        'description': poster['description'],
                        'image': self.download_image(poster['image']),  
                        'price': round(random.uniform(20, 99)) *100,
                        'rating': round(random.uniform(1, 5), 1),
                        'reviews_count': random.randint(0, 1000),
                        'in_stock': True,
                        'user': None  
                    }
                )

                # Create the ProductCategory mapping if it doesn't exist
                ProductCategory.objects.get_or_create(
                    product=product,
                    category=category
                )

        self.stdout.write(self.style.SUCCESS('Successfully imported poster data'))

    def download_image(self, image_url):
        """Download an image from a URL and return the file path to the saved image."""
        try:
            response = requests.get(image_url)
            if response.status_code == 200:
                # Define the directory
                products_dir = os.path.join(settings.MEDIA_ROOT, 'products')
                # Create the directory if it doesn't exist
                os.makedirs(products_dir, exist_ok=True)

                # Create a unique file name
                original_filename = os.path.basename(image_url)
                file_extension = os.path.splitext(original_filename)[1]  # Get the file extension
                unique_filename = f"{uuid.uuid4()}{file_extension}"  # Generate a unique name
                file_path = os.path.join(products_dir, unique_filename)

                # Write the image to the file
                with open(file_path, 'wb') as img_file:
                    img_file.write(response.content)

                return f"products/{unique_filename}"  
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error downloading image: {e}"))
        return None