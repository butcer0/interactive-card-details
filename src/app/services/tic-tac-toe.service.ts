import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  private gameDefault: number[] = [0,0,0,0,0,0,0,0,0];
  private winningSolutions: number[][] = [
    // Horizontal Solutions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical Solutions
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal Solutions
    [0, 4, 8],
    [2, 4, 6]
  ];

  private data$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(this.gameDefault);
  private winner$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  public updateData(index: number, value: number) {
    const curValue = this.data$.getValue();
    const updatedData: number[] = [...curValue];
    updatedData[index] = value;

    this.data$.next(updatedData);
  }

  public updateWinner(curPlayer: number) {
    const winner: boolean = this.checkWin(curPlayer);
    if (winner) {
      this.winner$.next(`Player ${curPlayer}`);
    }
  }

  public getData(): Observable<number[]> {
    return this.data$.asObservable();
  }

  public getWinner(): Observable<string> {
    return this.winner$.asObservable();
  }
  public resetGame(): void {
    this.data$.next([...this.gameDefault]);
    this.winner$.next('');
  }

  public checkWin(curPlayer: number): boolean {
    const playerIndex: number[] = this.data$.getValue().reduce((indexes, curNumber, curIndex) => {
      if (curNumber === curPlayer) {
        indexes.push(curIndex);
      }
      return indexes;
    }, [] as number[]);

    return this.winningSolutions.some(solution =>
      solution.every(index => playerIndex.includes(index))
    );
  }
}
