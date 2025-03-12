import { createAction, props } from '@ngrx/store';
import { LabelModel } from '../../models/label.model';
import { ChecklistItemModel } from '../../models/checklistItem.model';
import { UserModel } from '../../models/user.model';
import {ListCard} from '../../models/list.model';

export const getCard = createAction(
  '[Card] Get Card',
  props<{ cardId: string }>(),
);

export const getCardSuccess = createAction(
  '[Card] Get Card Success',
  props<{ card: any }>(),
);

export const getCardFailure = createAction(
  '[Card] Get Card Failure',
  props<{ error: string }>(),
);

export const updateLabel = createAction(
  '[Card] Update Label',
  props<{
    labels: LabelModel[];
  }>(),
);

export const deleteLabelFormCard = createAction(
  '[Card] Delete Label From Card',
  props<{ labelIds: string[] }>(),
);

export const updateCardDetail = createAction(
  '[Card] Update  Card Detail',
  props<{
    card: {
      id: string;
      title: string;
      dueDate: Date | null;
      description: string;
    };
  }>(),
);

export const updateCardDetailSuccess = createAction(
  '[Card] Update Card Detail Success',
  props<{
    card: {
      title: string;
      dueDate: Date | null;
      description: string;
    };
  }>(),
);

export const updateCardDetailFailure = createAction(
  '[Card] Update Card Detail Failure',
  props<{ error: string }>(),
);

export const addNewMember = createAction(
  '[Card] Add New Member',
  props<{ cardId: string; userId: string }>(),
);

export const addNewMemberSuccess = createAction(
  '[Card] Add New Member Success',
  props<{ cardId: string; user: UserModel }>(),
);

export const addNewMemberFailure = createAction(
  '[Card] Add New Member Failure',
  props<{ error: string }>(),
);

export const removeMember = createAction(
  '[Card] Remove Member',
  props<{ cardId: string; userId: string }>(),
);

export const removeMemberSuccess = createAction(
  '[Card] Remove Member Success',
  props<{ cardId: string; userId: string }>(),
);

export const removeMemberFailure = createAction(
  '[Card] Remove Member Failure',
  props<{ error: string }>(),
);

//
export const addNewChecklistItem = createAction(
  '[Card] Add New Checklist Item',
  props<{ checklistItem: ChecklistItemModel }>(),
);

export const toogleChecklistItem = createAction(
  '[Card] Toggle Checklist Item',
  props<{ checklistItem: ChecklistItemModel }>(),
);

export const deleteChecklistItem = createAction(
  '[Card] Delete Checklist Item',
  props<{ checklistItemId: string }>(),
);

export const getCardsByUserId = createAction('[Card] Get Cards By User Id');

export const getCardsByUserIdSuccess = createAction(
  '[Card] Get Cards By User Id Success',
  props<{ cards: ListCard[] }>(),
);

export const getCardsByUserIdFailure = createAction(
  '[Card] Get Cards By User Id Failure',
  props<{ error: string }>(),
);

export const clearCardState = createAction('[Card] Clear Card State');
