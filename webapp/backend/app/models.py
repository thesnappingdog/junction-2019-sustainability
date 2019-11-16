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

    def __repr__(self):
        return f'<Id: {self.recipe_id } Recipe name is {self.name}'


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredient_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(200))
    department_id = db.Column(db.Integer)

    def __repr__(self):
        return f'Ingredient ID: {self.ingredient_id} is {self.name}'


