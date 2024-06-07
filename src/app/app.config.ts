import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { HttpClientModule, provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
    ),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
    provideRouterStore()]
};
