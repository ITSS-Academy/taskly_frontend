import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as backgroundActions from './background.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { BackgroundService } from '../../services/background/background.service';

export const backgroundEffects = createEffect(
  (
    actions$ = inject(Actions),
    backgroundService = inject(BackgroundService),
  ) => {
    return actions$.pipe(
      ofType(backgroundActions.getBackgrounds),
      switchMap(() =>
        backgroundService.getAllBackgrounds().pipe(
          map((backgrounds) =>
            backgroundActions.getBackgroundsSuccess({ backgrounds }),
          ),
          catchError((error) =>
            of(backgroundActions.getBackgroundsFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
