import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import * as boardActions from '../board/board.actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { ChecklistItemService } from '../../services/checklistItem/checklist-item.service';
import * as checklistItemActions from './checklistItem.actions';
import * as cardActions from '../card/card.actions';
import * as listActions from '../list/list.actions';

export const createSubtask = createEffect(
  (
    actions$ = inject(Actions),
    checklistService = inject(ChecklistItemService),
  ) => {
    return actions$.pipe(
      ofType(checklistItemActions.addNewChecklistItem),
      exhaustMap(({ checklistItem }) => {
        return checklistService.createSubTask(checklistItem).pipe(
          mergeMap((result: any) => [
            listActions.addCSubtaskToCard({ subtask: result }),
            cardActions.addNewChecklistItem({ checklistItem: result }),
            checklistItemActions.addNewChecklistItemSuccess(),
          ]),
          catchError((error) => {
            return of(
              checklistItemActions.addNewChecklistItemFailure({
                error: error.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const toggleSubtask = createEffect(
  (
    actions$ = inject(Actions),
    checklistService = inject(ChecklistItemService),
  ) => {
    return actions$.pipe(
      ofType(checklistItemActions.toggleChecklistItem),
      exhaustMap(({ checklistItem }) => {
        return checklistService
          .toogleSubTask({
            id: checklistItem.id!,
            isCompleted: checklistItem.isCompleted,
          })
          .pipe(
            mergeMap((result: any) => [
              listActions.toogleChecklistItem({ checklistItem: result }),
              cardActions.toogleChecklistItem({ checklistItem: result }),
              checklistItemActions.toggleChecklistItemSuccess(),
            ]),
            catchError((error) => {
              return of(
                checklistItemActions.toggleChecklistItemFailure({
                  error: error.message,
                }),
              );
            }),
          );
      }),
    );
  },
  { functional: true },
);

export const deleteSubtask = createEffect(
  (
    actions$ = inject(Actions),
    checklistService = inject(ChecklistItemService),
  ) => {
    return actions$.pipe(
      ofType(checklistItemActions.deleteChecklistItem),
      exhaustMap(({ checklistItemId }) => {
        return checklistService.deleteSubTask(checklistItemId).pipe(
          mergeMap(() => [
            listActions.deleteChecklistItem({
              checklistItemId: checklistItemId,
            }),
            cardActions.deleteChecklistItem({ checklistItemId }),
            checklistItemActions.deleteChecklistItemSuccess(),
          ]),
          catchError((error) => {
            return of(
              checklistItemActions.deleteChecklistItemFailure({
                error: error.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
