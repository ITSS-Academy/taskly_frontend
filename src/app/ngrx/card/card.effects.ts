import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { CardService } from '../../services/card/card.service';
import * as cardActions from './card.actions';

export const getCard = createEffect(
  (actions$ = inject(Actions), cardService = inject(CardService)) => {
    return actions$.pipe(
      ofType(cardActions.getCard),
      switchMap(({ cardId }) => {
        return cardService.getCard(cardId).pipe(
          map((card: any) => cardActions.getCardSuccess({ card: card })),
          catchError((error) => {
            return of(cardActions.getCardFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
