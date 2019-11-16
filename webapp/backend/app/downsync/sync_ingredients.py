import csv
import os
from config import Config

def load_ingredient_csv():
    csv_path = os.path.join(Config.BASE_DIR, 'app/downsync/source/ingredients_data.csv')
    with open(csv_path, 'r') as source_csv:
        raw_ingredient_data = list(csv.DictReader(source_csv))
    return raw_ingredient_data


def parse_raw_data(raw_ingredient_data):
    ingredients_parsed = []
    for i in raw_ingredient_data:
        ingredients_parsed.append({
            'ingredient_id': i['id'],
            'name': i['name']
        })
    return ingredients_parsed


def prepare_ingredients():
    raw = load_ingredient_csv()
    return parse_raw_data(raw)


# Associating recipes to ingredients will have to be done separately, after RecipeID and IngredientID exist
