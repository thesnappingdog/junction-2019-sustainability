import csv


def load_ingredient_csv():
    with open('app/downsync/source/ingredients_data.csv', 'r') as source_csv:
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
