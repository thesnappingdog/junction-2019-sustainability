from app import app
from flask import send_from_directory, jsonify
from app.api.api import get_rich_recipe

FRONTEND_DIST_DIR = '../../frontend/dist'


@app.route('/')
def angular_index():
    return send_from_directory(FRONTEND_DIST_DIR, 'index.html')


@app.route('/api/get_rich_recipe', methods=['GET'])
def rich_recipe():
    name, ingredients, instructions, image = get_rich_recipe('00100', 1, [])
    return jsonify({
        'name': name,
        'ingredients': ingredients,
        'instructions': instructions,
        'image': image
    })

# ===== This has to be the VERY LAST route defined in this file! =====
# If route does not match any route above, then serve frontend file,
# according to the path
@app.route("/<path:file_path>", methods=[ "GET" ])
def send_file(file_path):
    return send_from_directory(FRONTEND_DIST_DIR, file_path)