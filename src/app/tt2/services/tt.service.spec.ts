import { TestBed } from '@angular/core/testing';

import { TtService } from './tt.service';
import { Observable } from "rxjs";
import * as Tt2Data from '../common/tt2.constants';

describe('TtService', () => {
  let service: TtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it( 'should get game data and winner data as observables emitting initial values', (): void => {
    const [gameData$, winner$]: [Observable<number[]>, Observable<string>] = service.getGameData();
    gameData$.subscribe((gameData) => {
      expect(gameData).toEqual(Tt2Data.DefaultGameState);
    })

    winner$.subscribe((gameData) => {
      expect(gameData).toEqual('');
    })
  });

  it('should add game data and persist in game state', (): void => {
    const [gameData$, winner$]: [Observable<number[]>, Observable<string>] = service.getGameData();
    service.addGameData(0, 1);

    const expectedGameData = [...Tt2Data.DefaultGameState];
    expectedGameData[0] = 1;

    gameData$.subscribe((gameData) => {
      expect(gameData).toEqual(expectedGameData);
    })
  })

  it('should recognize winning game state', (): void => {
    const [gameData$, winner$]: [Observable<number[]>, Observable<string>] = service.getGameData();
    service.addGameData(0, 1);
    service.addGameData(3, 1);
    service.addGameData(6, 1);

    const expectedGameData: number[] = [...Tt2Data.DefaultGameState];
    expectedGameData[0] = 1;
    expectedGameData[3] = 1;
    expectedGameData[6] = 1;

    const expectedWinnerData: string = 'Winner: Player 1';


    gameData$.subscribe((gameData) => {
      expect(gameData).toEqual(expectedGameData);
    })

    winner$.subscribe((gameData) => {
      expect(gameData).toEqual(expectedWinnerData);
    })
  })

  it('should reset game data to initial values', (): void => {
    const [gameData$, winner$]: [Observable<number[]>, Observable<string>] = service.getGameData();
    service.addGameData(0, 1);
    service.addGameData(3, 1);
    service.addGameData(6, 1);

    service.resetGameData();

    gameData$.subscribe((gameData) => {
      expect(gameData).toEqual(Tt2Data.DefaultGameState);
    })

    winner$.subscribe((gameData) => {
      expect(gameData).toEqual('');
    })
  })
});
