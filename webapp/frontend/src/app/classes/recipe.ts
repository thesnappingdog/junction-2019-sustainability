import { Ingredient } from './ingredient';

export class Recipe {
  public id: string;
  public name: string;
  public image_url: string;
  public ingredients: Ingredient[];
  public instructions: string;

  constructor(
    id: string,
    name: string,
    image_url: string,
    ingredients: Ingredient[],
    instructions: string
   ) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }

  static fromJSON( obj ) {
    let ingredients: Ingredient[] = [];
    obj['ingredients'].forEach( item => {
      ingredients.push(Ingredient.fromJSON(item))
    });
    return new Recipe(
      obj['id'].toString(),
      obj['name'],
      obj['image'],
      ingredients,
      obj['instructions']
    );
  }
}