import { Injectable } from "@angular/core";
import { CardModel } from "../models/card.model";
import * as CardConstants from  "../common/card.constant";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root'})
export class CardService {
  public GetCards(): Observable<CardModel[]> {
    return of(CardConstants.CardExamples);
  }
}
