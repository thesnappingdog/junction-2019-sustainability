import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config(object):
    BASE_DIR = basedir
    SECRET_KEY = os.environ['SECRET_KEY']
    SQLALCHEMY_DATABASE_URI = 'postgresql://{username}:{password}@{server}/{database}'.format(
        username=os.environ['POSTGRES_USERNAME'],
        password=os.environ['POSTGRES_PASSWORD'],
        server=os.environ['POSTGRES_SERVER'],
        database=os.environ['POSTGRES_DATABASE']
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Kesko API Key
    KESKO_PRIMARY_KEY = os.environ['KESKO_PRIMARY_KEY']

class KESKOConfig(Config):
    # API ENDPOINT URLS
    RECIPES_URL = "https://kesko.azure-api.net/v1/search/recipes"
    PRODUCTS_URL = "https://kesko.azure-api.net/v1/search/products"
    PRODUCTS_URL_V2 = "https://kesko.azure-api.net/v2/products"
    STORES_URL = "https://kesko.azure-api.net/v1/search/stores"
    OFFERS_URL = "https://kesko.azure-api.net/v1/search/offers"

