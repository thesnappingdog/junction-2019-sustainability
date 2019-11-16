import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../../classes/ingredient';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-recipe-browse-card',
  templateUrl: './recipe-browse-card.component.html',
  styleUrls: ['./recipe-browse-card.component.scss']
})
export class RecipeBrowseCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
