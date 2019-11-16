from app import app, db
from flask import send_from_directory, jsonify
from app.api.api import get_rich_recipe, stores_output, default_items, return_rich_inferred_recipes
from app.sync_static_assets import drop_and_sync_everything as sync_all

FRONTEND_DIST_DIR = '../../frontend/dist'


@app.route('/')
def angular_index():
    return send_from_directory(FRONTEND_DIST_DIR, 'index.html')


# Route for requesting rich recipe with recipe ID in url
@app.route('/api/get_rich_recipe/<recipe_id>', methods=['GET']) #Change this to POST and payload in the body once working frontend
def rich_recipe_json(recipe_id):
    zip_code = '00180' #Get this from POST body
    existing_ingredient_ids = ['1', '2', '3'] #Get this from POST body
    name, rich_ingredients, instructions, image = get_rich_recipe(zip_code, int(recipe_id), existing_ingredient_ids)
    return jsonify({'data': [{
        'id': recipe_id,
        'name': name,
        'ingredients': rich_ingredients,
        'instructions': instructions,
        'image': image
        }]
    }
)

# Route for requesting recipes based on items of user
@app.route('/api/recipe_suggestions/<items>', methods=['GET']) #Change this to POST and payload in the body once working frontend
def infer_recipes_json(items):
    recipes = return_rich_inferred_recipes(items)
    return jsonify({'data': recipes})

#Redundant ATM
# Route for requesting nearest stores with zip code 
@app.route('/api/get_stores/<zip_code>', methods=['GET'])
def store_json(zip_code):
    stores = stores_output(zip_code)
    return jsonify({'data': [stores]})

# Route for getting current ingredients of user
@app.route('/api/possibly_remaining_ingredients/', methods=['GET'])
def items_json():
    items = default_items()
    return jsonify({'data': [items]})


@app.route('/downsync/recreate', methods=['GET'])
def recreate():
    sync_all()
    return "Done. DB Up to date."

# ===== This has to be the VERY LAST route defined in this file! =====
# If route does not match any route above, then serve frontend file,
# according to the path
@app.route("/<path:file_path>", methods=[ "GET" ])
def send_file(file_path):
    return send_from_directory(FRONTEND_DIST_DIR, file_path)