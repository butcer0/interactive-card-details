import { Routes } from '@angular/router';
import { CardPageComponent } from "./card-page/card-page.component";
import { TicTacToeComponent } from "./tic-tac-toe/tic-tac-toe.component";

export const routes: Routes = [
  { path: 'card-page', component: CardPageComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: '', redirectTo: '/card-page', pathMatch: 'full'}
];
