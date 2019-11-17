import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { findIndex, indexOf, remove, uniq } from 'lodash';
import { catchError } from 'rxjs/operators';

import { IngredientsService } from '../services/ingredients.service';

import { Recipe } from '../classes/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private cachedRecipes: { [id: string]: Recipe; } = {};
  private suggestedRecipes: Recipe[] = [];

  private loadingSuggestions: boolean = false;
  
  private _moreRecipeSuggestions: Subject<Recipe[]> = new Subject<Recipe[]>();
  public moreRecipeSuggestions = this._moreRecipeSuggestions.asObservable();

  constructor(
    private ingredientsService: IngredientsService,
    private http: HttpClient
  ) {
  }

  // Angular frontend development use only
  private wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getRecipe( _id: any ) {
    const id = _id.toString();
    if (this.cachedRecipes[id]) return this.cachedRecipes[id];

    this.fetchRecipe(id).toPromise().then(
      resp => {
        let recipe = Recipe.fromJSON(resp['data']);
        this.cachedRecipes[recipe.id] = recipe;
        return recipe;
      },
      err => {
        console.error(err)
      }
    );
  }

  fetchRecipe( _id: any ): Observable<Object> {
    const id = _id.toString();
    let baseUrl = '/api/get_rich_recipe/';
    let url = baseUrl + id
    // --- START: Angular frontend development ---
    if (window.location.host == 'localhost:4200') url = '/assets/rich_recipe_example.json';
    // --- END: Angular frontend development ---
    return this.http.get(url);
  }

  isLoadingSuggestions(): boolean {
    return this.loadingSuggestions;
  }

  async loadRecipeSuggestions() {
    this.loadingSuggestions = true;
    // --- START: Angular frontend development ---
    if (window.location.host == 'localhost:4200') await this.wait(750);
    // --- END: Angular frontend development ---
    this.fetchRecipeSuggestions().toPromise().then(
      resp => {
        this.loadingSuggestions = false;
        let newSuggestions: Recipe[] = resp['data'].map( item => Recipe.fromJSON(item));
        newSuggestions.forEach( recipe => { 
          console.log(recipe);
          this.suggestedRecipes.push(recipe);
          const id = recipe.id
          if (!this.cachedRecipes[id]) this.cachedRecipes[id] = recipe;
        });
        this._moreRecipeSuggestions.next(newSuggestions);
      },
      err => {
        this.loadingSuggestions = false;
        console.error(err)
      }
    );
  }

  fetchRecipeSuggestions(): Observable<Object> {
    let url = '/api/recipe_suggestions';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let params = {
      'ingredients': this.ingredientsService.selectedExisting
    }
    // --- START: Angular frontend development ---
    if (window.location.host == 'localhost:4200') {
      url = '/assets/rich_recipe_example.json';
      return this.http.get(url);
    }
    // --- END: Angular frontend development ---
    return this.http.post(url, params, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
