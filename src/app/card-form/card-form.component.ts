import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AppState } from "../store/reducers";
import { Store } from "@ngrx/store";
import * as CardActions from '../store/actions/cards.actions';
import { CardModel } from "../models/card.model";
import { CardHelpers } from "../helpers/card.helpers";

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent {
  cardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private cardHelpers: CardHelpers) {
    this.cardForm = this.fb.group({
      name: ['Bob Villa', [Validators.required, Validators.maxLength(50)]],
      number: ['1234123412341234', [Validators.required, Validators.maxLength(16), Validators.minLength(16), Validators.pattern(/^\d+$/)]],
      expDate: ['12/32', [Validators.required, Validators.maxLength(5),  Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)]],
      cvc: ['123', [Validators.required, Validators.maxLength(3), Validators.pattern(/^\d+$/)]],
    })
  }

  onSubmit() {
    const card: CardModel = {...this.cardForm.value, id: this.cardHelpers.generateUUID()};
    console.log(`Card Info: ${JSON.stringify(card)}`);
    this.store.dispatch(CardActions.addCard({ card }));
  }
}
