import requests
from bs4 import BeautifulSoup
import json
"""
    This file is for scraping poster data from various website. 
"""
def get_poster_description(poster):
    anchor_tag = poster.find_parent('a')
    poster_link = ""
    if anchor_tag:
        poster_link = anchor_tag.get('href', 'No link available')
    else:
        poster_link = 'No link available'

    if poster_link and poster_link != 'No link available':
        if not poster_link.startswith('http'):
            poster_link = "https://displate.com" + poster_link

        detail_response = requests.get(poster_link)

        if detail_response.status_code == 200:
            detail_soup = BeautifulSoup(detail_response.text, 'html.parser')
            
            description_tag = detail_soup.find('p', class_='HeroTitle_descriptionText__7PMXa')
            if description_tag:
                return (description_tag.get_text(strip=True), poster_link)
            else:
                return ("No description available", poster_link)
            
    return ("No description available", poster_link)


def get_data_by_categories(url, LIMIT):    
    response = requests.get(url)
    data = []
    if response.status_code == 200 and LIMIT != 0:
        soup = BeautifulSoup(response.text, 'html.parser')
        posters = soup.find_all('img', class_="artworkPicture_artworkPicture__etg9a")

        for poster in posters:
            if LIMIT == 0:
                break
            poster_name = poster.get('alt', 'No name available')  
            poster_image_url = poster.get('src', 'No image URL available')
            description, poster_link = get_poster_description(poster)  
            LIMIT -= 1
            # print(f"Poster Name: {poster_name}")
            # print(f"Image URL: {poster_image_url}")
            # print(f"Description: {description}")
            # print(f"Poster Link: {poster_link}")
            
            # print("-" * 50)
            data.append({
                "name": poster_name,
                "image": poster_image_url,
                "description": description,
                "poster_link": poster_link
            })
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
    return data
    

if __name__ == "__main__":
    categories = ["Gaming", "Sport", "Anime", "Space", "Cars", "Fantasy", "Animals", "Landscapes", "Cityspaces", "Nature", "Movies", "Travel", "Retro"]
    poster_data = dict()
    LIMIT = 40
    for category in categories:
        data = get_data_by_categories(url="https://displate.com/posters?category=" + category.lower(), LIMIT=LIMIT)
        poster_data[category] = data

    # Save to JSON file
    with open('poster_data.json', 'w') as json_file:
        json.dump(poster_data, json_file, indent=4)

    print("Data saved to poster_data.json")


    
        