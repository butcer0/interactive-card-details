import { Component } from '@angular/core';
import { CardDisplayComponent } from "../card-display/card-display.component";
import { CardFormComponent } from "../card-form/card-form.component";

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [
    CardDisplayComponent,
    CardFormComponent
  ],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.css'
})
export class CardPageComponent {

}
