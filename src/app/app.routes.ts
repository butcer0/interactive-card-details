import { Routes } from '@angular/router';
import { CardPageComponent } from "./card-page/card-page.component";
import { TicTacToeComponent } from "./tic-tac-toe/tic-tac-toe.component";
import { GameScreenComponent } from "./hangman/components/game-screen/game-screen.component";
import { TtComponent } from "./tt2/components/tt/tt.component";
import {
  SemanticSearchComponent
} from "./symantic-elastic-vector-search/components/semantic-search/semantic-search.component";

export const routes: Routes = [
  { path: 'card-page', component: CardPageComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'hangman', component: GameScreenComponent },
  { path: 'tt2', component: TtComponent },
  { path: 'semantic-search', component: SemanticSearchComponent },
  { path: '', redirectTo: '/card-page', pathMatch: 'full'}
];
