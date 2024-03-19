import { Routes } from '@angular/router';
import { CardPageComponent } from "./card-page/card-page.component";

export const routes: Routes = [
  { path: 'card-page', component: CardPageComponent },
  { path: '', redirectTo: '/card-page', pathMatch: 'full'}
];
