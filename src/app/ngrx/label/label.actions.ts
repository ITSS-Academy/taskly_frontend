import { createAction, props } from '@ngrx/store';
import { LabelModel } from '../../models/label.model';

export const createLabel = createAction(
  '[Label] Create Label',
  props<{ label: LabelModel }>(),
);

export const createLabelSuccess = createAction(
  '[Label] Create Label Success',
  props<{ label: LabelModel }>(),
);

export const createLabelFailure = createAction(
  '[Label] Create Label Failure',
  props<{ error: any }>(),
);

export const getLabelsInBoard = createAction(
  '[Label] Get Label',
  props<{ id: string }>(),
);

export const getLabelsInBoardSuccess = createAction(
  '[Label] Get Label Success',
  props<{ labels: LabelModel[] }>(),
);

export const getLabelsInBoardFailure = createAction(
  '[Label] Get Label Failure',
  props<{ error: any }>(),
);

export const getLabelForFilter = createAction(
  '[Label] Get Label For Filter',
  props<{ id: string }>(),
);

export const getLabelForFilterSuccess = createAction(
  '[Label] Get Label For Filter Success',
  props<{ labels: LabelModel[] }>(),
);

export const getLabelForFilterFailure = createAction(
  '[Label] Get Label For Filter Failure',
  props<{ error: any }>(),
);

export const addLabelToTask = createAction(
  '[Label] Add Label To Task',
  props<{ labelIds: string[]; taskId: string }>(),
);

export const addLabelToTaskSuccess = createAction(
  '[Label] Add Label To Task Success',
  props<{ label: LabelModel[] }>(),
);

export const addLabelToTaskFailure = createAction(
  '[Label] Add Label To Task Failure',
  props<{ error: any }>(),
);

export const removeLabelFromTask = createAction(
  '[Label] Remove Label From Task',
  props<{ labelIds: string[]; taskId: string }>(),
);

export const removeLabelFromTaskSuccess = createAction(
  '[Label] Remove Label From Task Success',
  props<{ labelIds: string[] }>(),
);

export const removeLabelFromTaskFailure = createAction(
  '[Label] Remove Label From Task Failure',
  props<{ error: any }>(),
);

export const clearLabelState = createAction('[Label] Clear Label State');

export const updateLabel = createAction(
  '[Label] Update Label',
  props<{ label: any }>()
);

export const deleteLabel = createAction(
  '[Label] Delete Label',
  props<{ labelId: string }>()  // ✅ Thêm action deleteLabel
);
