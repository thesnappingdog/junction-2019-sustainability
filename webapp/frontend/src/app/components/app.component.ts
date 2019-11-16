import { Component, OnInit, OnDestroy  } from '@angular/core';

import { UserService } from '../services/user.service';
import { RecipeService } from '../services/recipe.service';
import { IngredientsService } from '../services/ingredients.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'recipe app frontend';

  constructor(
    private userService: UserService,
    private recipeService: RecipeService,
    private ingredientsService: IngredientsService
  ) {
  }

  ngOnInit() {
    this.ingredientsService.loadRecentlyBought();
    // this.userService.init();
    // this.recipeService.init();
  }

  ngOnDestroy() {

  }


}
