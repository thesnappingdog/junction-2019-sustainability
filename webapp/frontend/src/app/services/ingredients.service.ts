import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { findIndex, indexOf, remove, uniq } from 'lodash';

import { Ingredient } from '../classes/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  public recentlyBought: Ingredient[];
  public selected: Ingredient[];
  
  private _recentlyBoughtChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  public recentlyBoughtChanged = this._recentlyBoughtChanged.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.recentlyBought = [];
    this.selected = [];
  }

  // For starting over with previously selected
  getSelected(): Ingredient[] {
    return this.selected;
  }

  setSelected(ingredients: Ingredient[]) {
    this.selected = ingredients;
  }

  // For ingredient suggestions
  getRecentlyBought(): Ingredient[] {
    console.log('returning recenly bought');
    return this.recentlyBought;
  }

  loadRecentlyBought(): void {
    this.fetchRecentlyBought().toPromise().then(
      resp => {
        this.recentlyBought = resp['data'].map( item => Ingredient.fromJSON(item) );
        this._recentlyBoughtChanged.next(this.recentlyBought);
        console.log('loaded recenly bought');
        return this.recentlyBought;
      },
      err => {
        console.error(err)
      }
    );
  }

  fetchRecentlyBought(): Observable<Object> {
    let url = '/api/possibly_remaining_ingredients/';
    // --- START: Angular frontend development ---
    if (window.location.host == 'localhost:4200') url = '/assets/remaining_ingredients_example.json';
    // --- END: Angular frontend development ---
    return this.http.get(url);
  }

}
