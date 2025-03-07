import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {catchError, map, mergeMap, of, switchMap} from 'rxjs';
import {CardService} from '../../services/card/card.service';
import * as cardActions from './card.actions';
import * as listActions from '../list/list.actions';

export const getCard = createEffect(
  (actions$ = inject(Actions), cardService = inject(CardService)) => {
    return actions$.pipe(
      ofType(cardActions.getCard),
      switchMap(({cardId}) => {
        return cardService.getCard(cardId).pipe(
          map((card: any) => cardActions.getCardSuccess({card: card})),
          catchError((error) => {
            return of(cardActions.getCardFailure({error: error.message}));
          }),
        );
      }),
    );
  },
  {functional: true},
);

export const updateCardDetail = createEffect(
  (actions$ = inject(Actions), cardService = inject(CardService)) => {
    return actions$.pipe(
      ofType(cardActions.updateCardDetail),
      switchMap(({card}) => {
        return cardService.updateCard(card).pipe(
          mergeMap((result: any) => [
            listActions.updateNewCard({card: result}),
            cardActions.updateCardDetailSuccess({card}), //
          ]),
          catchError((error) =>
            of(cardActions.updateCardDetailFailure({error: error.message}))
          )
        );
      })
    );
  },
  {functional: true}
);

