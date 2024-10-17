import json
import os
import random

print("jiofew")
json_file_path = os.path.join(os.getcwd(), 'api', 'data', 'poster_data.json')

print(json_file_path)
with open(json_file_path, 'r') as f:
    poster_data = json.load(f)

for category_name, posters in poster_data.items():
    print("Category :", category_name, "Poster: ", len(posters))    
