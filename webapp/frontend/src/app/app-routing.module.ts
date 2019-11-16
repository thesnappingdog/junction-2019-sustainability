import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// View components
import { IntroViewComponent }         from './views/intro/intro-view.component';
import { StartViewComponent }         from './views/start/start-view.component';
import { BrowseViewComponent }        from './views/browse/browse-view.component';
import { ShoppingListViewComponent }  from './views/shopping-list/shopping-list-view.component';
import { UserViewComponent }          from './views/user/user-view.component';

const routes: Routes = [
  { path: '',               component: IntroViewComponent, pathMatch: 'full' },
  { path: 'intro',          component: IntroViewComponent },
  { path: 'start',          component: StartViewComponent },
  { path: 'browse',         component: BrowseViewComponent },
  { path: 'shopping-list',  component: ShoppingListViewComponent },
  { path: 'user',           component: UserViewComponent },
  { path: '**', redirectTo: 'browse' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
