import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CardHelpers {

  public generateUUID(): string {
    const randomSegment = () => Math.floor(Math.random() * 1e6).toString().padStart(6, '0');
    return `${randomSegment()}-${randomSegment()}-${randomSegment()}-${randomSegment()}`;
  }
}
