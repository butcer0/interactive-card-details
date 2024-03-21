import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from "../services/tic-tac-toe.service";
import { Observable, of } from "rxjs";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent implements OnInit{
  public gameData$: Observable<number[]>;
  public winner$: Observable<string>;
  public curPlayer: number = 1;
  constructor(private ticTacToeService: TicTacToeService) {
    this.gameData$ = of([]);
    this.winner$ = of('');
  }

  ngOnInit() {
    this.gameData$ = this.ticTacToeService.getData();
    this.winner$ = this.ticTacToeService.getWinner();
  }

  resetGame(): void {
    this.curPlayer = 1;
    this.ticTacToeService.resetGame();
  }
  updateData(index: number, value: number): void {
    console.info(`updating: i: ${index}, v: ${value}`);
    this.ticTacToeService.updateData(index, value);
    this.ticTacToeService.updateWinner(this.curPlayer);
    this.updateTurn();
  }

  updateTurn(): void {
    this.curPlayer = this.curPlayer === 1 ? 2 : 1;
    console.info(`curTurn: ${this.curPlayer}`);
  }
}
