# Dockerfile

FROM python:3.11.4-slim-bullseye

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy Django project code
COPY . /app/


Great! Now that we have a clear understanding of your Django backend structure and your requirements, let’s configure your Django application to work with Nginx and Gunicorn while keeping everything organized in Docker. We’ll go step by step.

Step 1: Update Your Django Settings
Before setting up Docker, let’s ensure your Django settings are correctly configured for serving static and media files.

In backend/ArtWall/ArtWall/settings.py, ensure the following:
python
Copy code
import os

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Media files (user-uploaded files)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'static/media')
This configuration will ensure that Nginx can serve both static and media files.

Step 2: Create the Dockerfile
Place your Dockerfile in the backend/ArtWall directory (where your manage.py is located) to keep your setup organized.

Create a Dockerfile at backend/ArtWall/Dockerfile:
Dockerfile
Copy code
# Base image for building the Django app
FROM python:3.10-slim AS builder

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy Django application code
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Start Gunicorn
CMD ["gunicorn", "ArtWall.wsgi:application", "--bind", "0.0.0.0:8000"]