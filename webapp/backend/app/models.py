from app import db

recipe_ingredients = db.Table('recipe_ingredients',
                              db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'), primary_key=True),
                              db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True)
                              )


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, unique=True)
    order_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(200))
    image = db.Column(db.String(300))
    instructions = db.Column(db.Text())
    ingredients = db.relationship('Ingredient',
                                  secondary=recipe_ingredients,
                                  lazy='subquery',
                                  backref=db.backref('recipes', lazy=True))

    @staticmethod
    def check_recipe_existence(recipe_id):
        return Recipe.query.filter_by(recipe_id=recipe_id).count() > 0

    def add_recipe_to_table(self):
        if Recipe.check_recipe_existence(self.recipe_id) is False:
            db.session.add(self)
            db.session.commit()
        else:
            return f'Recipe {self.recipe_id} already exists'

    def associate_ingredients_to_recipe(self, new_ingredients):
        for ingredient in new_ingredients:
            self.ingredients.append(ingredient)
            db.session.commit()

    def __repr__(self):
        return f'<Id: {self.recipe_id } Recipe name is {self.name}'


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredient_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(200))
    department_id = db.Column(db.Integer)

    @staticmethod
    def check_ingredient_existence(ingredient_id):
        return Ingredient.query.filter_by(ingredient_id=ingredient_id).count() > 0

    def add_ingredient_to_table(self):
        if Ingredient.check_ingredient_existence(self.ingredient_id) is False:
            db.session.add(self)
            db.session.commit()
        else:
            return f'{self.ingredient_id} already exists'

    def __repr__(self):
        return f'Ingredient ID: {self.ingredient_id} is {self.name}'



