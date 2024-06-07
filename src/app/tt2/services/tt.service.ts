import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import * as TT2Data from '../common/tt2.constants';

@Injectable({
  providedIn: 'root'
})
export class TtService {

  private gameData$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(TT2Data.DefaultGameState);
  private winner$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() { }

  getGameData(): [Observable<number[]>, Observable<string>] {
    return [this.gameData$.asObservable(), this.winner$.asObservable()];
  }

  addGameData(index: number, curPlayer: number): void {
    const curData: number[] = this.gameData$.getValue();
    const  updatedData: number[] = [...curData];
    updatedData[index] = curPlayer;
    this.gameData$.next([...updatedData]);
    const isWinner: boolean = this.checkWin(curPlayer);
    if (isWinner) {
      const winnerDialogue = `Winner: Player ${curPlayer}`;
      console.info(winnerDialogue);
      this.winner$.next(winnerDialogue)
    }
  }

  resetGameData(): void {
    this.gameData$.next(TT2Data.DefaultGameState);
    this.winner$.next('');
  }

  private checkWin(curPlayer: number): boolean {
    const playerIndexes: number[] = this.gameData$.getValue().reduce((indexes: number[], curNumber, currentIndex) => {
      if (curNumber === curPlayer) {
        indexes.push(currentIndex);
      }
      return indexes
    }, [] as number[])

    return TT2Data.WinningSolutions.some(solution =>
      solution.every(index => playerIndexes.includes(index))
    );
  }
}
