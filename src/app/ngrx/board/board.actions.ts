import { createAction, props } from '@ngrx/store';
import { BoardModel } from '../../models/board.model';

export const createBoard = createAction(
  '[Board] Create Board',
  props<{ board: BoardModel }>(),
);
export const createBoardSuccess = createAction(
  '[Board] Create Board Success',
  props<{ board: BoardModel }>(),
);
export const createBoardFail = createAction(
  '[Board] Create Board Fail',
  props<{ error: string }>(),
);

export const getBoards = createAction('[Board] Get Boards');
export const getBoardsSuccess = createAction(
  '[Board] Get Boards Success',
  props<{ boards: BoardModel[] }>(),
);
export const getBoardsFail = createAction(
  '[Board] Get Boards Fail',
  props<{ error: string }>(),
);

export const getBoard = createAction(
  '[Board] Get Board Actions',
  props<{ boardId: string }>(),
);
export const getBoardSuccess = createAction(
  '[Board] Get Board Actions Success',
  props<{ board: BoardModel }>(),
);
export const getBoardFailure = createAction(
  '[Board] Get Board Actions Failure',
  props<{
    errorMessage: string;
  }>(),
);

export const getInvitedBoards = createAction('[Board] Get Invited Boards');
export const getInvitedBoardsSuccess = createAction(
  '[Board] Get Invited Boards Success',
  props<{
    boards: BoardModel[];
  }>(),
);
export const getInvitedBoardsFail = createAction(
  '[Board] Get Invited Boards Fail',
  props<{ error: string }>(),
);

export const acceptInvitation = createAction(
  '[Board] Accept Invitation',
  props<{ board: BoardModel }>(),
);
