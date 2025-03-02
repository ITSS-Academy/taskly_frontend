import { createAction, props } from '@ngrx/store';
import { ListCard, ListModel } from '../../models/list.model';

export const addNewList = createAction(
  '[List] Add New List',
  props<{ list: ListModel; boardId: string }>(),
);
export const addNewListSuccess = createAction(
  '[List] Add New List Success',
  props<{ list: ListModel }>(),
);
export const addNewListFailure = createAction(
  '[List] Add New List Failure',
  props<{ error: string }>(),
);

export const storeLists = createAction(
  '[List] Store Lists',
  props<{ lists: ListModel[] }>(),
);

export const getLists = createAction(
  '[List] Get Lists',
  props<{ boardId: string }>(),
);
export const getListsSuccess = createAction(
  '[List] Get Lists Success',
  props<{ lists: ListModel[] }>(),
);
export const getListsFailure = createAction(
  '[List] Get Lists Failure',
  props<{ error: string }>(),
);

export const updatePosition = createAction(
  '[Card] Update Position',
  props<{ list: ListModel[]; boardId: string }>(),
);
export const updatePositionSuccess = createAction(
  '[Card] Update Position Success',
  props<{ list: ListModel[] }>(),
);
export const updatePositionFailure = createAction(
  '[Card] Update Position Failure',
  props<{ error: string }>(),
);

export const updateCard = createAction(
  '[Card] Update Card',
  props<{
    cardId: string;
    listId: string;
    cardPosition: number;
  }>(),
);
export const updateCardSuccess = createAction(
  '[Card] Update Card Success',
  props<{ cards: ListCard[]; listId: string; cardId: string }>(),
);
export const updateCardFailure = createAction(
  '[Card] Update Card Failure',
  props<{ error: string }>(),
);

export const deleteList = createAction(
  '[List] Delete List',
  props<{ listId: string }>(),
);
export const deleteListSuccess = createAction(
  '[List] Delete List Success',
  props<{ listId: string }>(),
);
export const deleteListFailure = createAction(
  '[List] Delete List Failure',
  props<{ error: string }>(),
);

export const clearListStore = createAction('[List] Clear List Store');
