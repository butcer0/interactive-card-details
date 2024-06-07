import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, of, switchMap } from "rxjs";
import { HangmanService } from "../../services/hangman.service";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent implements OnInit{
  debugging: boolean = false;
  gameWord$: Observable<string> = of('');
  gameWordItems$: Observable<{ letter: string, visible: boolean }[]> = of([]);
  guessedLetters$: Observable<string[]> = of([]);
  remainingGuesses$: Observable<number> = of(0);
  showGuessesRemaining: boolean = true;

  constructor(private hangmanService: HangmanService) { }

  ngOnInit() {
    this.debugging = this.hangmanService.getDebugging();
    this.guessedLetters$ = this.hangmanService.getGuessedLetters();
    this.remainingGuesses$ = this.hangmanService.getRemainingGuesses();
    this.gameWord$ = this.hangmanService.getGameWord();
    this.gameWordItems$ = combineLatest([this.guessedLetters$, this.hangmanService.getGameWord()]).pipe(
      map(([guessedLetters, gameWord]) => {
        return gameWord.split('').map(letter => ({
          letter: letter,
          visible: guessedLetters.includes(letter)
        }));
    }));
    this.remainingGuesses$.subscribe(remaining => this.showGuessesRemaining = remaining >= 0);
  }
}
