from app import db
from app.models import Recipe as Recipe
from app.models import Ingredient as Ingredient
from app.downsync import sync_recipes as r_sync
from app.downsync import sync_ingredients as i_sync


def load_recipes():
    recipes = r_sync.prepare_recipes()
    return recipes


def load_ingredients():
    ingredients = i_sync.prepare_ingredients()
    return ingredients


def initialize_recipe_instance(recipe):
    new_recipe = Recipe(
        recipe_id=recipe['recipe_id'],
        order_id=recipe['order_id'],
        name=recipe['name'],
        image=recipe['image'],
        instructions=recipe['instructions']
    )
    return new_recipe


def initialize_ingredient_instance(recipe):
    new_ingredient = Ingredient(
        ingredient_id=recipe['ingredient_id'],
        name=recipe['name'],
        department_id=recipe['department_id']
    )
    return new_ingredient


def commit_new_recipe(new_recipe):
    new_recipe.add_recipe_to_table()
    print('Recipe commit complete')


def commit_new_ingredient(new_ingredient):
    new_ingredient.add_ingredient_to_table()
    print('Ingredient commit complete')


def recipe_loop(recipes):
    for recipe in recipes:
        new_recipe = initialize_recipe_instance(recipe)
        print('Recipe Init complete')
        commit_new_recipe(new_recipe)


def ingredient_loop(ingredients):
    for ingredient in ingredients:
        new_ingredient = initialize_ingredient_instance(ingredient)
        print('Ingredient Init complete')
        commit_new_ingredient(new_ingredient)


def drop_and_sync_recipes():
    db.drop_all()
    db.create_all()

    recipes = load_recipes()
    try:
        recipe_loop(recipes)
    except KeyError:
        raise Exception


def drop_and_sync_everything():
    db.drop_all()
    db.create_all()

    recipes = load_recipes()
    try:
        recipe_loop(recipes)
    except KeyError:
        raise Exception

    ingredients = load_ingredients()
    try:
        ingredient_loop(ingredients)
    except KeyError:
        raise Exception

