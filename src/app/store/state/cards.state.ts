import { CardModel } from "../../models/card.model";

export interface CardsState {
  cards: CardModel[];
  loading: boolean;
}

export const initialCardsState: CardsState = {
  cards: [],
  loading: false
}
