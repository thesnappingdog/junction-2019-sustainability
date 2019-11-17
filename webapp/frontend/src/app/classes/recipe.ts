import { Ingredient } from './ingredient';

export class Recipe {
  public id: string;
  public name: string;
  public imageUrl: string;
  public ingredients: Ingredient[];
  public instructions: string;

  constructor(
    id: string,
    name: string,
    imageUrl: string,
    ingredients: Ingredient[],
    instructions: string
   ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }

  getInstructionSteps(): string[] {
    if (!this.instructions) return [];
    return this.instructions.split('#').map( step => step.trim()).filter(entry => /\S/.test(entry));
  }

  static fromJSON( obj ) {
    let ingredients: Ingredient[] = [];
    obj['ingredients'].forEach( item => {
      ingredients.push(Ingredient.fromJSON(item))
    });
    return new Recipe(
      obj['recipe_id'],
      obj['name'],
      obj['image'],
      ingredients,
      obj['instructions']
    );
  }
}