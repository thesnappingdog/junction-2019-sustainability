import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { RecipeDetailCardComponent } from './components/recipe-detail-card/recipe-detail-card.component';
import { RecipeBrowseCardComponent } from './components/recipe-browse-card/recipe-browse-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailCardComponent,
    RecipeBrowseCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
