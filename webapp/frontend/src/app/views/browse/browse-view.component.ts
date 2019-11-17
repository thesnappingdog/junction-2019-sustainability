import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { RecipeService } from '../../services/recipe.service';

import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-browse-view',
  templateUrl: './browse-view.component.html',
  styleUrls: ['./browse-view.component.scss']
})
export class BrowseViewComponent implements OnInit, OnDestroy {

  private moreRecipeSuggestionsRef: Subscription;

  public recipeSuggestions: Recipe[] = [];

  public currentlyLoadingSuggestions: boolean = false;

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {

  }
    
  ngOnInit() {
    this.moreRecipeSuggestionsRef = this.recipeService.moreRecipeSuggestions.subscribe( (newSuggestions) => {
      newSuggestions.forEach( recipe => this.recipeSuggestions.push(recipe));
      this.currentlyLoadingSuggestions = this.recipeService.isLoadingSuggestions();
    });
    this.currentlyLoadingSuggestions = this.recipeService.isLoadingSuggestions();
    
    // For page reload case, when there's no suggestions
    setTimeout(() => {
      if (this.recipeSuggestions.length <= 0 && !this.recipeService.isLoadingSuggestions()) {
        this.router.navigate(['/', 'start']);
      }
    }, 500);
  }

  ngOnDestroy() {
    this.moreRecipeSuggestionsRef.unsubscribe();
  }

}
