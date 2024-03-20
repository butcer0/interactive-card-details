import { Component, OnInit } from '@angular/core';
import { CardModel } from "../models/card.model";
import { Observable } from "rxjs";
import { AppState } from "../store/reducers";
import { Store } from "@ngrx/store";
import { selectAlLCards, selectCardsLoading } from "../store/selectors/cards.selector";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import * as CardActions from '../store/actions/cards.actions';

@Component({
  selector: 'app-card-display',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css', './card-display-loading.component.css']
})
export class CardDisplayComponent implements OnInit {
  cards$: Observable<CardModel[]> = this.store.select(selectAlLCards);
  loading$: Observable<boolean> = this.store.select(selectCardsLoading);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.store.dispatch(CardActions.loadCards());
  }
  removeCard(card: CardModel): void {
    const id = card.id;
    this.store.dispatch(CardActions.removeCard({ id }));
  }
}
