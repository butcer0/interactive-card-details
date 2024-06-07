import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { alphabet } from "../../common/alphabet.constants";
import { AsyncPipe, NgForOf } from "@angular/common";
import { HangmanService } from "../../services/hangman.service";

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent implements OnInit{
  alphabet$: Observable<{  letter: string, disabled: boolean }[] > = of([]);
  guessedLetters$: Observable<string[]> = of([]);

  constructor(private hangmanService: HangmanService) { }

  ngOnInit() {
    this.alphabet$ = this.hangmanService.getGuessedLetters().pipe(
      map(guessedLetters =>
        alphabet.map(letter => ({
          letter,
          disabled: guessedLetters.includes(letter)
        }))
      )
    );
  }

  addGuessedChar(letter: string) {
    this.hangmanService.addGuessedChar(letter);
  }
}
