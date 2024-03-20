import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { rootReducer } from './app/store/reducers';
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { provideEffects } from "@ngrx/effects";
import { CardEffects } from "./app/store/effects/card.effects";

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(rootReducer),
    provideEffects([CardEffects]),
    provideRouter(routes)
  ],
}).catch(err => console.error(err));
