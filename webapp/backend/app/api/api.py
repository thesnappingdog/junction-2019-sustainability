from requests.auth import AuthBase
from config import KESKOConfig
import requests
import json


class KAuth(AuthBase):
    def __init__(self):
        self.key = KESKOConfig.KESKO_PRIMARY_KEY

    def __call__(self, r):
        r.headers['Ocp-Apim-Subscription-Key'] = self.key
        r.headers['Content-Type'] = 'application/json'
        return r


def get_recipe(recipe_id, main_category="4", sub_category="28"):
    recipe_url = KESKOConfig.RECIPES_URL
    body = {'filters' : {'mainCategory': main_category, 'subCategory': sub_category}}
    recipes_response = requests.post(recipe_url, json=body, auth=KAuth())
    recipes_response_text = recipes_response.text
    recipes_response_json = json.loads(recipes_response_text)
    recipe = recipes_response_json['results'][recipe_id]
    name = recipe['Name']
    instructions = recipe['Instructions']
    ingredients = recipe['Ingredients'][0]['SubSectionIngredients']
    image = recipe['PictureUrls'][0]['Normal']
    return name, ingredients, instructions, image


def parse_ingredients(ingredients):
    parsed_ingredients = []
    for ingredient in ingredients:
        parsed_ingredient = {'name': ingredient[0]['IngredientTypeName'],
                             'amount': ingredient[0]['Amount'],
                             'unit': ingredient[0]['Unit'],
                             'type': ingredient[0]['IngredientType']
                             }
        parsed_ingredients.append(parsed_ingredient)
    return parsed_ingredients


def get_items_for_item_type(item_type):
    products_url = KESKOConfig.PRODUCTS_URL
    body = {'filters': {'ingredientType': item_type}}
    items_response = requests.post(products_url, json=body, auth=KAuth())
    items_json = json.loads(items_response.text)
    return items_json['results']


def parse_items(items):
    parsed_items = []
    for item in items:
        parsed_item = {'ean': item['ean'], 'name': item['labelName']['english']}
        parsed_items.append(parsed_item)
    return parsed_items


def get_stores(zip_code='00180'):
    store_url = KESKOConfig.STORES_URL
    body = {'filters': {'postCode': zip_code}}
    stores_response = requests.post(store_url, json=body, auth=KAuth())
    stores_json = json.loads(stores_response.text)
    return stores_json['results']


def parse_stores(stores):
    parsed_stores = []
    for store in stores:
        parsed_store = {'name': store['Name'], 'id': store['Id']}
        parsed_stores.append(parsed_store)
    return parsed_stores


def request_availability(ean):
    params = {'ean': ean}
    availability_response = requests.get(KESKOConfig.PRODUCTS_URL_V2, params=params, auth=KAuth())
    availability_json = json.loads(availability_response.text)
    availability_stores = availability_json[0]['stores']
    return availability_stores


def check_availability(availability_stores, store):
    for a_store in availability_stores:
        if a_store['id'] == store['id']:
            return True
        return False


def is_product_available(ean, store):
    availability_stores = request_availability(ean)
    return check_availability(availability_stores, store)


def get_rich_recipe(zip_code, recipe_id, existing_ingredient_types):
    stores = parse_stores(get_stores(zip_code))
    recipe_name, recipe_ingredients, recipe_instructions, recipe_image = get_recipe(recipe_id)
    parsed_ingredients = parse_ingredients(recipe_ingredients)
    rich_ingredients = []
    for ingredient in parsed_ingredients:
        available = 1
        if not ingredient['type'] in existing_ingredient_types:
            available = 0
            items = parse_items(get_items_for_item_type(ingredient['type']))
            for item in items:
                for store in stores:
                    if is_product_available(item['ean'], store):
                        available = 1
        ingredient['availability'] = available
        rich_ingredients.append(ingredient)
    return recipe_name, rich_ingredients, recipe_instructions, recipe_image
