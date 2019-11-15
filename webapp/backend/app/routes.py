from app import app
from flask import send_from_directory

FRONTEND_DIST_DIR = '../../frontend/dist'

@app.route('/')
def angular_index():
    return send_from_directory(FRONTEND_DIST_DIR, 'index.html')

# ===== This has to be the VERY LAST route defined in this file! =====
# If route does not match any route above, then serve frontend file,
# according to the path
@app.route("/<path:file_path>", methods=[ "GET" ])
def send_file(file_path):
    return send_from_directory(FRONTEND_DIST_DIR, file_path)