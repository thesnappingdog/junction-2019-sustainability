import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Angular Material modules
// import {A11yModule} from '@angular/cdk/a11y';
// import {DragDropModule} from '@angular/cdk/drag-drop';
// import {PortalModule} from '@angular/cdk/portal';
// import {ScrollingModule} from '@angular/cdk/scrolling';
// import {CdkStepperModule} from '@angular/cdk/stepper';
// import {CdkTableModule} from '@angular/cdk/table';
// import {CdkTreeModule} from '@angular/cdk/tree';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatBadgeModule} from '@angular/material/badge';
// import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import {MatCardModule} from '@angular/material/card';
// import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
// import {MatStepperModule} from '@angular/material/stepper';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
// import {MatInputModule} from '@angular/material/input';
// import {MatListModule} from '@angular/material/list';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatSelectModule} from '@angular/material/select';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatSliderModule} from '@angular/material/slider';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatSortModule} from '@angular/material/sort';
// import {MatTableModule} from '@angular/material/table';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatTreeModule} from '@angular/material/tree';

// Proprietary modules
import { AppRoutingModule }           from './app-routing.module';
import { AppComponent }               from './components/app.component';
import { IntroCardComponent }         from './components/intro-card/intro-card.component';
import { RecipeCardComponent }        from './components/recipe-card/recipe-card.component';
import { BrowseViewComponent }        from './views/browse/browse-view.component';
import { IntroViewComponent }         from './views/intro/intro-view.component';
import { UserViewComponent }          from './views/user/user-view.component';
import { StartViewComponent }         from './views/start/start-view.component';
import { ShoppingListViewComponent }  from './views/shopping-list/shopping-list-view.component';

// Angular Material modules
const modules = [
  MatChipsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule
];

@NgModule({
  declarations: [
    // Proprietary modules
    AppComponent,
    RecipeCardComponent,
    BrowseViewComponent,
    IntroViewComponent,
    UserViewComponent,
    IntroCardComponent,
    StartViewComponent,
    ShoppingListViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...modules  // Angular Material modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
