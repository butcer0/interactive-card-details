import { createReducer, on } from "@ngrx/store";
import * as CardsActions from '../actions/cards.actions';
import { initialCardsState } from "../state/cards.state";

export const cardsReducer = createReducer(
  initialCardsState,
  on(CardsActions.loadCards, state => ({ ... state, loading: true})),
  on(CardsActions.loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
    loading: false
  })),
  on(CardsActions.loadCardsFailure, state => ({
    ... state,
    loading: false
  })),
  on(CardsActions.addCard, (state, { card }) => ({
    ...state,
    cards: [...state.cards, card],
  })),
  on(CardsActions.removeCard, (state, { id }) => ({
    ...state,
    cards: state.cards.filter(card => card.id !== id)
  }))
)
