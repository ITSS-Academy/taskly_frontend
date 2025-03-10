import {createAction, props} from '@ngrx/store';
import {ListCard, ListModel} from '../../models/list.model';
import {ChecklistItemModel} from '../../models/checklistItem.model';
import {UserModel} from '../../models/user.model';

export const addNewList = createAction(
  '[List] Add New List',
  props<{ listName: string; boardId: string }>(),
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
  props<{ lists: ListModel[] }>(),
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
    previousListId: string;
  }>(),
);
export const updateCardSuccess = createAction(
  '[Card] Update Card Success',
  props<{
    cards: ListCard[];
    listId: string;
    cardId: string;
    previousListId: string;
    cardPosition: number;
  }>(),
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

export const addCard = createAction(
  '[Card] Add Card',
  props<{ card: string; listId: string }>(),
);

export const addCardSuccess = createAction(
  '[Card] Add Card Success',
  props<{ card: ListCard; listId: string }>(),
);

export const addCardFailure = createAction(
  '[Card] Add Card Failure',
  props<{ error: string }>(),
);

export const deleteCard = createAction(
  '[Card] Delete Card',
  props<{ cardId: string }>(),
);

export const deleteCardSuccess = createAction(
  '[Card] Delete Card Success',
  props<{ cardId: string }>(),
);

export const deleteCardFailure = createAction(
  '[Card] Delete Card Failure',
  props<{ error: string }>(),
);

export const addNewMemberToCard = createAction(
  '[List] Add New Member To Card',
  props<{ cardId: string; user: UserModel }>(),
);

export const removeMemberFromCard = createAction(
  '[List] Remove Member From Card',
  props<{ cardId: string; userId: string }>(),
);

///
export const updateLabelToCard = createAction(
  '[Card] Update Label To Card',
  props<{ cardId: string; labels: ListModel[] }>(),
);

export const updateNewCard = createAction(
  '[Card] Update New Card',
  props<{ card: any }>(),
);

export const addCSubtaskToCard = createAction(
  '[Card] Add Subtask To Card',
  props<{ subtask: ChecklistItemModel }>(),
);

export const toogleChecklistItem = createAction(
  '[List] Toggle Checklist Item In List',
  props<{ checklistItem: ChecklistItemModel }>(),
);

export const deleteChecklistItem = createAction(
  '[List] Delete Checklist Item In List',
  props<{ checklistItemId: string }>(),
);

export const startUpdateCard = createAction('[Card] Start Update Card');

export const resetUpdatingCardSuccess = createAction(
  '[List] Reset Updating Card Success',
);

export const storeNewLists = createAction(
  '[List] Store New Lists',
  props<{ lists: ListModel[] }>(),
);

export const addCommentCount = createAction(
  '[List] Add Comment Count',
  props<{ cardId: string }>(),
);

export const subtractCommentCount = createAction(
  '[List] Subtract Comment Count',
  props<{ cardId: string }>(),
);

export const clearListStore = createAction('[List] Clear List Store');
