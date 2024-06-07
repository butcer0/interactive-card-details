import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { from, Observable, of } from "rxjs";
import { PlayerDataModel } from "../../models/player-data.model";
import { TtService } from "../../services/tt.service";
import { MockHttpService } from "../../services/mock-http.service";

@Component({
  selector: 'app-tt',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './tt.component.html',
  styleUrl: './tt.component.css'
})
export class TtComponent implements OnInit{
  gameSquares$: Observable<number[]> = of([]);
  playerData$: Promise<PlayerDataModel>;
  winner$: Observable<string> = of('');
  curPlayer: number = 1;

  constructor(private ttService: TtService, private httpService: MockHttpService) {
    this.playerData$ = this.httpService.getPlayerData();
  }

  ngOnInit(): void {
    [this.gameSquares$, this.winner$] = this.ttService.getGameData();
  }

  changeTurn(): void {
    this.curPlayer = this.curPlayer === 1 ? 2 : 1;
  }

  clickSquare(index: number, curPlayer: number) {
    this.changeTurn();
    this.ttService.addGameData(index, curPlayer);
  }

  resetGame(): void {
    this.curPlayer = 1;
    this.ttService.resetGameData();
  }
}
