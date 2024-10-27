# Use the official Ubuntu image as the base image
FROM ubuntu:latest

# Install Python and pip, and ensure apt package lists are updated
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . .

# Expose the port your app runs on (replace with the appropriate port number)
EXPOSE 8000

# Command to run the application
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
