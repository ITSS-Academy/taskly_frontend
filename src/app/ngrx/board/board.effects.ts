import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {BoardService} from '../../services/board/board.service';
import * as boardActions from './board.actions';
import {catchError, forkJoin, map, of, switchMap} from 'rxjs';
import {BoardModel} from '../../models/board.model';
import {ListService} from '../../services/list/list.service';
import {ListModel} from '../../models/list.model';

export const createBoardEffect = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.createBoard),
      switchMap(({board}) => {
        return boardService.createBoard(board).pipe(
          map((createdBoard: any) => boardActions.createBoardSuccess({board: createdBoard})),
          catchError((error) => {
            return of(boardActions.createBoardFail({error: error.message}));
          })
        );
      })
    );
  }, {functional: true}
);

export const getBoardsEffect = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService)) => {
    return actions$.pipe(
      ofType(boardActions.getBoards),
      switchMap(() => {
        return boardService.getAllBoards().pipe(
          map((boards: any) => boardActions.getBoardsSuccess({boards})),
          catchError((error) => {
            return of(boardActions.getBoardsFail({error: error.message}));
          })
        );
      })
    );
  }, {functional: true}
);

export const getBoard$ = createEffect(
  (actions$ = inject(Actions), boardService = inject(BoardService), listService = inject(ListService)) => {
    return actions$.pipe(
      ofType(boardActions.getBoard),
      switchMap(({boardId}) =>
        forkJoin({
          board: boardService.getBoard(boardId),
          lists: listService.getLists(boardId)
        }).pipe(
          map(({board, lists}) => {
            if (!board) {
              throw new Error('Board not found');
            }
            console.log(board);
            return boardActions.getBoardSuccess({
              board: {
                ...board,
                lists: lists || [] as ListModel[]
              }
            });
          }),
          catchError((error) => {
            console.error('Error fetching board:', error);
            return of(boardActions.getBoardFailure({errorMessage: error.message || 'Unknown error'}));
          })
        )
      )
    );
  },
  {functional: true}
);
