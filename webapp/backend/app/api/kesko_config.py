from config import Config


class KESKOConfig(Config):
    # API ENDPOINT URLS
    RECIPES_URL = "https://kesko.azure-api.net/v1/search/recipes"
    STORES_URL = "https://kesko.azure-api.net/v1/search/stores"
    OFFERS_URL = "https://kesko.azure-api.net/v1/search/offers"

    HEADERS = {
        'Ocp-Apim-Subscription-Key': Config.KESKO_PRIMARY_KEY,
        'Content-Type': 'application/json'
    }

