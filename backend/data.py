import requests
from bs4 import BeautifulSoup

# URL of the Displate gaming category page
url = "https://displate.com/posters?category=gaming"

# Send an HTTP request to get the page content
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the page content using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all img tags with the specified class
    posters = soup.find_all('img', class_="artworkPicture_artworkPicture__etg9a")

    # Loop through each poster and extract the name and image URL
    for poster in posters:
        # Get the poster name from the 'alt' attribute
        poster_name = poster.get('alt', 'No name available')  # Default to 'No name available' if alt is missing
        
        # Get the image URL from the 'src' attribute
        poster_image_url = poster.get('src', 'No image URL available')  # Default to 'No image URL available' if src is missing
        
        # Print the results
        print(f"Poster Name: {poster_name}")
        print(f"Image URL: {poster_image_url}")
        print("-" * 50)
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")
