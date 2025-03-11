import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import * as boardActions from '../board/board.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { LabelService } from '../../services/label/label.service';
import * as labelActions from './label.actions';
import * as listActions from '../list/list.actions';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import * as cardActions from '../card/card.actions';
import { removeLabelFromCard } from '../list/list.actions';

export const createLabel = createEffect(
  (actions$ = inject(Actions), labelService = inject(LabelService)) => {
    return actions$.pipe(
      ofType(labelActions.createLabel),
      switchMap(({ label }) => {
        return labelService.createLabel(label).pipe(
          map((label: any) =>
            labelActions.createLabelSuccess({ label: label }),
          ),
          catchError((error) => {
            return of(
              labelActions.createLabelFailure({ error: error.message }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getLabelsInBoard = createEffect(
  (actions$ = inject(Actions), labelService = inject(LabelService)) => {
    return actions$.pipe(
      ofType(labelActions.getLabelsInBoard),
      switchMap(({ id }) => {
        return labelService.getLabelsInBoard(id).pipe(
          map((labels: any) =>
            labelActions.getLabelsInBoardSuccess({ labels: labels }),
          ),
          catchError((error) => {
            return of(
              labelActions.getLabelsInBoardFailure({ error: error.message }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getLabelsForFilter = createEffect(
  (actions$ = inject(Actions), labelService = inject(LabelService)) => {
    return actions$.pipe(
      ofType(labelActions.getLabelForFilter),
      switchMap(({ id }) => {
        return labelService.getLabelsInBoard(id).pipe(
          map((labels: any) =>
            labelActions.getLabelForFilterSuccess({ labels: labels }),
          ),
          catchError((error) => {
            return of(
              labelActions.getLabelForFilterFailure({ error: error.message }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const addLabelToTask = createEffect(
  (actions$ = inject(Actions), labelService = inject(LabelService)) => {
    return actions$.pipe(
      ofType(labelActions.addLabelToTask),
      switchMap(({ labelIds, taskId }) => {
        return labelService.addLabelToTask(labelIds, taskId).pipe(
          mergeMap((label: any) => [
            listActions.updateLabelToCard({
              cardId: label.cardId,
              labels: label.labelData,
            }),
            cardActions.updateLabel({ labels: label.labelData }),
            labelActions.addLabelToTaskSuccess({ label: label }),
          ]),
          catchError((error) =>
            of(labelActions.addLabelToTaskFailure({ error: error.message })),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteLabelFromTask = createEffect(
  (actions$ = inject(Actions), labelService = inject(LabelService)) => {
    return actions$.pipe(
      ofType(labelActions.removeLabelFromTask),
      switchMap(({ labelIds, taskId }) => {
        return labelService.deleteLabelFromTask(labelIds, taskId).pipe(
          mergeMap((label: any) => [
            listActions.removeLabelFromCard({
              cardId: label.cardId,
              labelIds: label.labelData,
            }),
            cardActions.deleteLabelFormCard({ labelIds: label.labelData }),
            labelActions.removeLabelFromTaskSuccess({
              labelIds: label.labelData,
            }),
          ]),
          catchError((error) =>
            of(
              labelActions.removeLabelFromTaskFailure({ error: error.message }),
            ),
          ),
        );
      }),
    );
  },
  { functional: true },
);
