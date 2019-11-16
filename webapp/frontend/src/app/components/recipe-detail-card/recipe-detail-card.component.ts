import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../../classes/ingredient';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-recipe-detail-card',
  templateUrl: './recipe-detail-card.component.html',
  styleUrls: ['./recipe-detail-card.component.scss']
})
export class RecipeDetailCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
