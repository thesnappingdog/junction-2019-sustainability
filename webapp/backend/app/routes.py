from app import app
from flask import send_file


@app.route('/')
def index():
    return send_file('../frontend/dist/index.html', mimetype='text/html')

