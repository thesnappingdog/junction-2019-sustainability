import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { findIndex, indexOf, remove, uniq } from 'lodash';

import { Ingredient } from '../classes/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  public existingIngredientSuggestions: Ingredient[];
  public existingIngredients: Ingredient[];
  
  private _existingIngredientsChanged: Subject<void> = new Subject<void>();
  public existingIngredientsChanged = this._existingIngredientsChanged.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.existingIngredientSuggestions = [];
    this.existingIngredients = [];
  }

  addExistingIngredient(ingredient: Ingredient) {
    this.existingIngredients.push(ingredient)
    this._existingIngredientsChanged.next();
  }

  removeExistingIngredient(ingredient: Ingredient) {
    this.existingIngredients.push(ingredient)
    this._existingIngredientsChanged.next();
  }

  getExistingIngredientSuggestions() {
    this.fetchExistingIngredientSuggestions().toPromise().then(
      resp => {
        this.existingIngredientSuggestions = resp['data'].map( item => Ingredient.fromJSON(item) );
        this._existingIngredientsChanged.next();
      },
      err => {
        console.error(err)
      }
    );
  }

  fetchExistingIngredientSuggestions(): Observable<Object> {
    let url = '/api/possibly_remaining_ingredients/';
    // --- START: Angular frontend development ---
    if (window.location.host == 'localhost:4200') url = 'assets/remaining_ingredients_example.json';
    // --- END: Angular frontend development ---
    return this.http.get(url);
  }

}
