import { Component, OnInit } from '@angular/core';
import { CategoryScreenComponent } from "../category-screen/category-screen.component";
import { map, Observable, of, tap } from "rxjs";
import { HangmanService } from "../../services/hangman.service";
import { AsyncPipe, NgIf } from "@angular/common";
import { HangmanComponent } from "../hangman/hangman.component";
import { KeyboardComponent } from "../keyboard/keyboard.component";

@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [
    CategoryScreenComponent,
    AsyncPipe,
    NgIf,
    HangmanComponent,
    KeyboardComponent
  ],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.css'
})
export class GameScreenComponent implements OnInit{
  gameWordSet$: Observable<boolean> = of(false);
  winner$: Observable<string> = of('');
  showKeyboard$: Observable<boolean> = of(true);

  constructor(private hangManService: HangmanService) {
  }

  ngOnInit() {
    this.gameWordSet$ = this.hangManService.getGameWord().pipe(
      map(word => !!word)
    );
    this.winner$ = this.hangManService.getWinner();
    this.showKeyboard$ = this.winner$.pipe(
      tap(result => console.info(`winner updated: ${result}`)),
      map(result => !result)
    );
  }

  resetGame(): void {
    this.hangManService.resetGame();
  }
}
