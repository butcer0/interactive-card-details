import { createAction, props } from "@ngrx/store";
import { CardModel } from "../../models/card.model";

export const loadCards = createAction('[Cards] Load Cards');

export const loadCardsSuccess = createAction(
  '[Cards] Load Cards Success',
  props<{ cards: CardModel[]}>()
)

export const loadCardsFailure = createAction(
  '[Cards] Load Cards Failure',
  props<{ error: any}>()
)

export const addCard = createAction(
  '[Card] Add Card',
  props<{ card: CardModel }>()
)

export const removeCard = createAction(
  '[Card] Remove Card',
  props<{ number: string }>()
)

