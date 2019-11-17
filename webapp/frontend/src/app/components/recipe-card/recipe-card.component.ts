import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { IngredientsService } from '../../services/ingredients.service';

import { Ingredient } from '../../classes/ingredient';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit, OnDestroy {
  
  @Input() recipe: Recipe;
  public isOpen: boolean = false;

  public displayedColumns: string[] = ['select', 'name', 'amount', 'unit'];
  public dataSource: MatTableDataSource<Ingredient>;
  public selection: SelectionModel<Ingredient>;

  constructor(
    private ingredientsService: IngredientsService
  ) { }

  /** The label for the checkbox on the passed row */
  checkboxLabel( row: Ingredient): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Ingredient>(this.recipe.ingredients);
    // Select all ingredients except those selected as existing ones
    let existingIds = this.ingredientsService.getSelectedExisting().map( item => item.id );
    let initiallySelected = this.recipe.ingredients.filter( item => existingIds.indexOf(item.id) == -1);
    this.selection = new SelectionModel<Ingredient>(true, initiallySelected, true);
    this.selection.changed.subscribe( event => {
      console.log(this.selection.selected);
    });
  }

  ngOnDestroy() {
    this.selection.changed.unsubscribe()
  }

  addSelectedToShoppingList() {
    // TODO
  }

}
