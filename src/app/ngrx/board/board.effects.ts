import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import * as boardActions from './board.actions';
import {
  catchError,
  exhaustMap,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { BoardModel } from '../../models/board.model';
import { ListService } from '../../services/list/list.service';
import { ListModel } from '../../models/list.model';

export const createBoardEffect = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.createBoard),
      switchMap(({ board }) => {
        return boardService.createBoard(board).pipe(
          map((createdBoard: any) => {
            console.log(createdBoard);
            return boardActions.createBoardSuccess({ board: createdBoard });
          }),
          catchError((error) => {
            return of(boardActions.createBoardFail({ error: error.message }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getBoardsEffect = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.getBoards),
      switchMap(() => {
        return boardService.getAllBoards().pipe(
          map((boards: any) => boardActions.getBoardsSuccess({ boards })),
          catchError((error) => {
            return of(boardActions.getBoardsFail({ error: error.message }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getBoard$ = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.getBoard),
      mergeMap(({ boardId }) => {
        return boardService.getBoard(boardId).pipe(
          map((board: any) => {
            // console.log(board);
            return boardActions.getBoardSuccess({ board });
          }),
          catchError((error) => {
            return of(
              boardActions.getBoardFailure({
                errorMessage: error.error.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getInvitedBoardsEffect = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.getInvitedBoards),
      switchMap(() => {
        return boardService.getInvitedBoards().pipe(
          map((boards: any) =>
            boardActions.getInvitedBoardsSuccess({ boards }),
          ),
          catchError((error) => {
            return of(
              boardActions.getInvitedBoardsFail({ error: error.message }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const changeBoardBackgroundEffect = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.changeBoardBackground),
      switchMap(({ boardId, backgroundId, background }) => {
        return boardService
          .changeBackground({ backgroundId, boardId }, background)
          .pipe(
            map((data: any) => {
              return boardActions.changeBoardBackgroundSuccess({
                backgroundId: data.backgroundId,
                background: data.background,
                boardId,
              });
            }),
            catchError((error) => {
              return of(
                boardActions.changeBoardBackgroundFail({
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

export const searchBoardsEffect = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.searchBoards),
      switchMap(({ search }) => {
        return boardService.searchBoards(search).pipe(
          map((boards: any) => boardActions.searchBoardsSuccess({ boards })),
          catchError((error) => {
            return of(boardActions.searchBoardsFail({ error: error.message }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const changeBoardNameEffect = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.changeBoardName),
      switchMap(({ boardId, name }) => {
        return boardService.changeBoardName(boardId, name).pipe(
          map((data: any) => {
            return boardActions.changeBoardNameSuccess({
              boardId,
              name: data.name,
            });
          }),
          catchError((error) => {
            return of(
              boardActions.changeBoardNameFail({ error: error.error.message }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteBoardEffect = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.deleteBoard),
      switchMap(({ boardId }) => {
        return boardService.deleteBoard(boardId).pipe(
          map(() => {
            return boardActions.deleteBoardSuccess({ boardId });
          }),
          catchError((error) => {
            return of(
              boardActions.deleteBoardFail({ error: error.error.message }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
