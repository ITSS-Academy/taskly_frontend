import { createAction, props } from '@ngrx/store';
import { ChecklistItemModel } from '../../models/checklistItem.model';

export const addNewChecklistItem = createAction(
  '[ChecklistItem] Add New Checklist',
  props<{ checklistItem: ChecklistItemModel }>(),
);

export const addNewChecklistItemSuccess = createAction(
  '[ChecklistItem] Add New Checklist Success',
);

export const addNewChecklistItemFailure = createAction(
  '[ChecklistItem] Add New Checklist Failure',
  props<{ error: string }>(),
);

export const toggleChecklistItem = createAction(
  '[ChecklistItem] Toggle Checklist Item',
  props<{
    checklistItem: {
      id: string;
      isCompleted: boolean;
    };
  }>(),
);

export const toggleChecklistItemSuccess = createAction(
  '[ChecklistItem] Toggle Checklist Item Success',
);

export const toggleChecklistItemFailure = createAction(
  '[ChecklistItem] Toggle Checklist Item Failure',
  props<{ error: string }>(),
);

export const deleteChecklistItem = createAction(
  '[ChecklistItem] Delete Checklist Item',
  props<{ checklistItemId: string }>(),
);

export const deleteChecklistItemSuccess = createAction(
  '[ChecklistItem] Delete Checklist Item Success',
);

export const deleteChecklistItemFailure = createAction(
  '[ChecklistItem] Delete Checklist Item Failure',
  props<{ error: string }>(),
);

export const clearChecklistItemState = createAction(
  '[ChecklistItem] Clear Checklist Item State',
);
