import csv


def load_recipe_csv():
    with open('app/downsync/source/recipe_data.csv', 'r') as source_csv:
        raw_recipe_data = list(csv.DictReader(source_csv))
    return raw_recipe_data


def parse_raw_data(raw_recipe_data):
    recipes_parsed = []
    for i in raw_recipe_data:
        recipes_parsed.append({
            'recipe_id': i['recipe_id'],
            'order_id': i['order_id'],
            'name': i['name'],
            'image': i['image'],
            'instructions': i['instructions']
        })
    return recipes_parsed


def prepare_recipes():
    raw = load_recipe_csv()
    return parse_raw_data(raw)


# Associating recipes to ingredients will have to be done separately, after RecipeID and IngredientID exist
