import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CardsState } from "../state/cards.state";

export const selectCardsState = createFeatureSelector<CardsState>('cards');

export const selectAlLCards = createSelector(
  selectCardsState,
  (state: CardsState) => state.cards
);

export const selectCardsLoading = createSelector(
  selectCardsState,
  (state: CardsState) => state.loading
);
