import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CardService } from "../../services/card.service";
import * as CardActions from '../actions/cards.actions';
import { catchError, delay, map, mergeMap, of } from "rxjs";

@Injectable()
export class CardEffects {
  loadCards$ = createEffect(() => this.actions$.pipe(
    ofType(CardActions.loadCards),
    mergeMap(() => this.cardService.GetCards()
      .pipe(
        delay(1000),
        map(cards => CardActions.loadCardsSuccess({ cards })),
        catchError(error => of(CardActions.loadCardsFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private cardService: CardService
  ) { }
}
