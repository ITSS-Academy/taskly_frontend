import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { authReducer } from './ngrx/auth/auth.reducer';
import * as authEffects from './ngrx/auth/auth.effects';
import { boardReducer } from './ngrx/board/board.reducer';
import * as boardEffects from './ngrx/board/board.effects';
import { userReducer } from './ngrx/user/user.reducer';
import * as userEffects from './ngrx/user/user.effects';
import { listReducer } from './ngrx/list/list.reducer';
import * as listEffects from './ngrx/list/list.effects';
import { notificationsReducer } from './ngrx/notifications/notifications.reducer';
import * as notificationsEffects from './ngrx/notifications/notifications.effects';
import { environment } from '../environments/environment.development';
import { labelReducer } from './ngrx/label/label.reducer';
import * as labelEffects from './ngrx/label/label.effects';
import * as cardEffects from './ngrx/card/card.effects';
import { cardReducer } from './ngrx/card/card.reducer';
import { checklistItemReducer } from './ngrx/checklistItem/checklistItem.reducer';
import * as checklistItemEffects from './ngrx/checklistItem/checklistItem.effects';
import * as CommentEffects from './ngrx/comment/comment.effects';
import { commentReducer } from './ngrx/comment/comment.reducer';
import * as BackgroundEffects from './ngrx/background/background.effects';
import { backgroundReducer } from './ngrx/background/background.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      auth: authReducer,
      board: boardReducer,
      user: userReducer,
      list: listReducer,
      notifications: notificationsReducer,
      label: labelReducer,
      card: cardReducer,
      checklistItem: checklistItemReducer,
      comment: commentReducer,
      background: backgroundReducer,
    }),
    provideEffects([
      authEffects,
      boardEffects,
      userEffects,
      listEffects,
      notificationsEffects,
      labelEffects,
      cardEffects,
      checklistItemEffects,
      CommentEffects,
      BackgroundEffects,
    ]),
    provideFirebaseApp(() =>
      initializeApp(environment.firebase),
    ),
    provideAuth(() => getAuth()),
  ],
};
