import * as listActions from './list.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ListService} from '../../services/list/list.service';
import {catchError, map, of, switchMap} from 'rxjs';

export const addList$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.addNewList),
      switchMap(({listName, boardId}) => {
        return listService.addNewList(listName, boardId).pipe(
          map((list: any) => listActions.addNewListSuccess({list})),
          catchError((error) =>
            of(
              listActions.addNewListFailure({
                error: error.message || 'Unknown error',
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const getLists$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.getLists),
      switchMap(({boardId}) => {
        return listService.getLists(boardId).pipe(
          map((lists: any) => {
            // console.log(lists);
            return listActions.getListsSuccess({lists})
          }),
          catchError((error) =>
            of(
              listActions.getListsFailure({
                error: error.message || 'Unknown error',
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const updatePosition$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.updatePosition),
      switchMap(({list, boardId}) => {
        return listService.updateLists(list, boardId).pipe(
          map((lists: any) => {
            console.log(lists);
            return listActions.updatePositionSuccess({lists});
          }),
          catchError((error) =>
            of(
              listActions.updatePositionFailure({
                error: error.message || 'Unknown error',
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const deleteList$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.deleteList),
      switchMap(({listId}) => {
        return listService.deleteList(listId).pipe(
          map(() => listActions.deleteListSuccess({listId})),
          catchError((error) =>
            of(
              listActions.deleteListFailure({
                error: error.message || 'Unknown error',
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const updateCard$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.updateCard),
      switchMap(({cardId, listId, cardPosition}) => {
        return listService.updateListCard(cardId, listId, cardPosition).pipe(
          map((value, index) => {
            console.log(value);
            return listActions.updateCardSuccess({
              cards: value as any,
              listId,
              cardId,
            });
          }),
          catchError((error) =>
            of(
              listActions.updateCardFailure({
                error: error.message || 'Unknown error',
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const addCard$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.addCard),
      switchMap(({card, listId}) => {
        return listService.addTask(card, listId).pipe(
          map((card: any) => {
            return listActions.addCardSuccess({card: card.data[0], listId});
          }),
          catchError((error) =>
            of(
              listActions.addCardFailure({
                error: error.message || 'Unknown error',
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const deleteCard$ = createEffect(
  (action$ = inject(Actions), listService = inject(ListService)) => {
    return action$.pipe(
      ofType(listActions.deleteCard),
      switchMap(({cardId}) => {
        return listService.deleteTask(cardId).pipe(
          map(() => listActions.deleteCardSuccess({cardId})),
          catchError((error) =>
            of(
              listActions.deleteCardFailure({
                error: error.message || 'Unknown error',
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);
