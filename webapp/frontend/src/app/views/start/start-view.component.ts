import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { IngredientsService } from '../../services/ingredients.service';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient } from 'src/app/classes/ingredient';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent implements OnInit, OnDestroy {

  private existingIngredientsChangedRef: Subscription;

  visible = true;
  selectable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  public selectedIngredients: Ingredient[] = [];
  public suggestedIngredients: Ingredient[] = [
    Ingredient.fromName('Lemon'),
    Ingredient.fromName('Lime'),
    Ingredient.fromName('Apple')
  ];

  constructor(
    private router: Router,
    private ingredientsService: IngredientsService,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.existingIngredientsChangedRef = this.ingredientsService.existingIngredientsChanged.subscribe( () =>
      this.onExistingIngredientsChange()
    );
  }

  ngOnDestroy() {
    this.existingIngredientsChangedRef.unsubscribe();
  }

  addNew(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our ingredient
    if ((value || '').trim()) {
      this.selectedIngredients.push(Ingredient.fromName(value));
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeSelected(ingredient: Ingredient): void {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  addSuggested(ingredient: Ingredient) {
    console.log('adding', ingredient)
    this.selectedIngredients.push(ingredient);
    const index = this.suggestedIngredients.indexOf(ingredient);
    if (index >= 0) {
      this.suggestedIngredients.splice(index, 1);
    }
  }

  removeExistingIngredient(ingredient: Ingredient) {
    this.ingredientsService.removeExistingIngredient(ingredient);
  }

  onExistingIngredientsChange() {
    // TODO: Make sure necessary updates are made, if any
    console.log("TODO: onExistingIngredientsChange")
  }

  proceedToRecipeSuggestions() {
    this.recipeService.getRecipeSuggestions(); // Starts fetching recipe suggestions

    // TODO: Do some transition animation to make waiting time seem shorter

    this.router.navigate(['/', 'start']);
  }

}
