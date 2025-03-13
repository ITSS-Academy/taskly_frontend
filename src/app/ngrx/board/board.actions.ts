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

export const changeBoardBackground = createAction(
  '[Board] Change Board Background',
  props<{ boardId: string; backgroundId?: string; background?: File }>(),
);

export const changeBoardBackgroundSuccess = createAction(
  '[Board] Change Board Background Success',
  props<{
    backgroundId: string;
    background: {
      fileLocation: string;
    };
    boardId: string;
  }>(),
);

export const changeBoardBackgroundFail = createAction(
  '[Board] Change Board Background Fail',
  props<{ error: string }>(),
);

export const listenBackgroundChange = createAction(
  '[Board] Listen Background Change',
  props<{
    boardId: string;
    background: {
      id: string;
      fileLocation: string;
    };
  }>(),
);

export const searchBoards = createAction(
  '[Board] Search Boards',
  props<{ search: string }>(),
);
export const searchBoardsSuccess = createAction(
  '[Board] Search Boards Success',
  props<{ boards: BoardModel[] }>(),
);
export const searchBoardsFail = createAction(
  '[Board] Search Boards Fail',
  props<{ error: string }>(),
);

export const changeBoardName = createAction(
  '[Board] Change Board Name',
  props<{ boardId: string; name: string }>(),
);

export const changeBoardNameSuccess = createAction(
  '[Board] Change Board Name Success',
  props<{ boardId: string; name: string }>(),
);

export const changeBoardNameFail = createAction(
  '[Board] Change Board Name Fail',
  props<{ error: string }>(),
);

export const clearBoardBackground = createAction('[Board] Clear Board State');

export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ boardId: string }>(),
);

export const deleteBoardFail = createAction(
  '[Board] Delete Board Fail',
  props<{ error: string }>(),
);

export const addNewMemberToBoard = createAction(
  '[Board] Add New Member To Board',
  props<{ boardId: string; userId: string }>(),
);

export const addUserIdsBeKicked = createAction(
  '[Board] Add User Ids Be Kicked',
  props<{ boardId: string; userIds: string[] }>(),
);

export const deleteBoardSuccess = createAction(
  '[Board] Delete Board Success',
  props<{ boardId: string }>(),
);

export const removeUserFromBoard = createAction(
  '[Board] Remove Member From Board',
  props<{ boardId: string; userId: string }>(),
);

export const removeUserFromBoardSuccess = createAction(
  '[Board] Remove Member From Board Success',
  props<{ boardId: string; userId: string }>(),
);

export const removeUserFromBoardFail = createAction(
  '[Board] Remove Member From Board Fail',
  props<{ error: string }>(),
);
