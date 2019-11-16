import { Ingredient } from './ingredient';

export class Recipe {
  public ingredients: Ingredient[];

  constructor( obj: any ) {
    this.constructIngredients(obj['ingredients'])
  }

  constructIngredients(objects) {
    objects.forEach(obj => {
      this.ingredients.push(Ingredient.fromJSON(obj))
    });
  }
}