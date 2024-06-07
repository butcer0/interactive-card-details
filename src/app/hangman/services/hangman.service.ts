import { Injectable } from '@angular/core';
import { HangmanCategoriesConstants } from "../common/hangman-categories.constants";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { environment } from '../../../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class HangmanService {
  private gameWord$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private guessedLetters$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private guessesRemaining$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private winner$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {  }

  getDebugging(): boolean {
    return environment.debugHangman;
  }

  getGameWord(): Observable<string> {
    return this.gameWord$.asObservable();
  }

  getCategories(): string[] {
    return Object.keys(HangmanCategoriesConstants);
  }

  setCategory(category: string) {
    const wordList = HangmanCategoriesConstants[category];
    const gameWord = this.getRandomWord(wordList).toLowerCase();
    this.gameWord$.next(gameWord);
    this.guessesRemaining$.next(gameWord.length + 4);
  }

  getRandomWord(wordList: string[]) {
    const randomIndex: number = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  }

  getGuessedLetters(): Observable<string[]> {
    return this.guessedLetters$.asObservable();
  }
  addGuessedChar(letter: string): void {
    const guessedLetters: string[] = this.guessedLetters$.getValue();
    const updatedLetters: string[] = [...guessedLetters, letter];
    this.guessedLetters$.next([...updatedLetters]);
    const isWinner: boolean = this.checkWin(updatedLetters);
    this.minusGuessesRemaining();
  }

  minusGuessesRemaining(): void {
    const curGuessesRemaining = this.guessesRemaining$.getValue() - 1;
    this.checkLose(curGuessesRemaining);
    this.guessesRemaining$.next(curGuessesRemaining);
  }

  getRemainingGuesses(): Observable<number> {
    return this.guessesRemaining$.asObservable();
  }

  checkLose(guessesRemaining: number): void {
    console.info(`guesses remaining: ${guessesRemaining}`);
    if (guessesRemaining < 0) {
      console.warn('game over triggered');
      this.winner$.next(`Game Over! The word was ${this.gameWord$.getValue()}`);
    }
  }
  checkWin(updatedLetters: string[]): boolean {
    const isWinner = this.gameWord$.getValue().split('').every(letter => updatedLetters.includes(letter));
    console.info(`winner: ${isWinner}`);
    if (isWinner) {
      this.winner$.next('Winner! Great job');
    }
    return isWinner;
  }

  getWinner(): Observable<string> {
    return this.winner$.asObservable();
  }

  resetGame(): void {
    this.winner$.next('');
    this.gameWord$.next('');
    this.guessesRemaining$.next(0);
    this.guessedLetters$.next([]);
  }
}
