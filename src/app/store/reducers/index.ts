import { CardsState } from "../state/cards.state";
import { ActionReducerMap } from "@ngrx/store";
import { cardsReducer } from "./cards.reducer";

export interface AppState {
  cards: CardsState
}

export const rootReducer: ActionReducerMap<AppState> = {
  cards: cardsReducer
}
