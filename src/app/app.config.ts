import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {provideHttpClient} from '@angular/common/http';
import {authReducer} from './ngrx/auth/auth.reducer';
import * as authEffects from './ngrx/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideHttpClient(), provideRouter(routes), provideAnimationsAsync(),
    provideStore({
      auth: authReducer
    }), provideEffects([
      authEffects
    ]),
    provideFirebaseApp(() => initializeApp({
      "projectId": "kanban-246",
      "appId": "1:656199323172:web:b6a85c041e28e03a8b52b1",
      "storageBucket": "kanban-246.firebasestorage.app",
      "apiKey": "AIzaSyAy1F24MJYwj0d2Mya4T7fJgPG3wC4Lwv0",
      "authDomain": "kanban-246.firebaseapp.com",
      "messagingSenderId": "656199323172",
      "measurementId": "G-14D94KVP60"
    })), provideAuth(() => getAuth())]
};
