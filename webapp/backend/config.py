import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    KESKO_PRIMARY_KEY = os.environ.get('KESKO_PRIMARY_KEY')


class KESKOConfig(Config):
    # API ENDPOINT URLS
    RECIPES_URL = "https://kesko.azure-api.net/v1/search/recipes"
    STORES_URL = "https://kesko.azure-api.net/v1/search/stores"
    OFFERS_URL = "https://kesko.azure-api.net/v1/search/offers"

    HEADERS = {
        'Ocp-Apim-Subscription-Key': Config.KESKO_PRIMARY_KEY,
        'Content-Type': 'application/json'
    }

