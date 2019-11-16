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

  private recentlyBoughtIngredientsChangedRef: Subscription;

  visible = true;
  selectable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  public selectedIngredients: Ingredient[] = [];
  public suggestedIngredients: Ingredient[] = [];

  constructor(
    private router: Router,
    private ingredientsService: IngredientsService,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.recentlyBoughtIngredientsChangedRef = this.ingredientsService.recentlyBoughtChanged.subscribe( (recentlyBought) => {
      this.suggestedIngredients = recentlyBought;
    });
    this.selectedIngredients  = this.ingredientsService.getSelected();
    this.suggestedIngredients = this.ingredientsService.getRecentlyBought();
  }

  ngOnDestroy() {
    this.recentlyBoughtIngredientsChangedRef.unsubscribe();
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
    this.ingredientsService.setSelected(this.selectedIngredients);
  }

  removeSelected(ingredient: Ingredient): void {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }
    this.ingredientsService.setSelected(this.selectedIngredients);
  }

  addSuggested(ingredient: Ingredient) {
    console.log('adding', ingredient)
    this.selectedIngredients.push(ingredient);
    const index = this.suggestedIngredients.indexOf(ingredient);
    if (index >= 0) {
      this.suggestedIngredients.splice(index, 1);
    }
    this.ingredientsService.setSelected(this.selectedIngredients);
  }

  onSuggestedChanged() {
    // TODO: Make sure necessary updates are made, if any
    console.log("TODO: onSuggestedChanged")
  }

  proceedToRecipeSuggestions() {
    this.recipeService.getRecipeSuggestions(); // Starts fetching recipe suggestions

    // TODO: Do some transition animation to make waiting time seem shorter

    this.router.navigate(['/', 'start']);
  }

}
