import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TtComponent } from './tt.component';
import { TtService } from "../../services/tt.service";
import { MockHttpService } from "../../services/mock-http.service";
import { from, Observable, of } from "rxjs";
import * as Tt2Data from '../../common/tt2.constants';
import { PlayerDataModel } from "../../models/player-data.model";

describe('TtComponent', () => {
  let component: TtComponent;
  let fixture: ComponentFixture<TtComponent>;
  let mockTtService: jasmine.SpyObj<TtService>;
  let mockHttpService: jasmine.SpyObj<MockHttpService>;

  beforeEach(async () => {
    mockTtService = jasmine.createSpyObj('TtService', ['getGameData', 'addGameData', 'resetGameData']);
    mockHttpService = jasmine.createSpyObj('MockHttpService', ['getPlayerData']);

    mockTtService.getGameData.and.returnValue([of(Tt2Data.DefaultGameState), of('')]);
    mockHttpService.getPlayerData.and.resolveTo(Tt2Data.MockPlayerData);


    await TestBed.configureTestingModule({
      imports: [TtComponent],
      providers: [
        { provide: TtService, useValue: mockTtService },
        { provide: MockHttpService, useValue: mockHttpService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', (): void => {
    expect(component).toBeTruthy();
  });

  it ('should call get game data on init', (): void => {
    expect(mockTtService.getGameData).toHaveBeenCalled();
  });

  it('should change turns when square clicked', (): void => {
    const initialPlayer = component.curPlayer;
    component.clickSquare(1, initialPlayer);

    expect(component.curPlayer).not.toBe(initialPlayer);
    expect(mockTtService.addGameData).toHaveBeenCalledWith(1, initialPlayer);
  });

  it('should load player data on component initialization',  (done: DoneFn): void => {
    expect(component.playerData$).toBeDefined();
    expect(mockHttpService.getPlayerData).toHaveBeenCalled();

    const playerData$: Observable<PlayerDataModel> = from(component.playerData$);
    playerData$.subscribe((playerData: PlayerDataModel) => {
      expect(playerData).toBe(Tt2Data.MockPlayerData);
      done();
    });
  })

  it('should reset game data when resetGame is called', (): void => {
    component.clickSquare(1, 1);
    expect(component.curPlayer).not.toBe(1);

    component.resetGame();
    expect(component.curPlayer).toBe(1);
    expect(mockTtService.resetGameData).toHaveBeenCalled();
  });
});
