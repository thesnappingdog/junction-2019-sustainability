import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../../classes/ingredient';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
