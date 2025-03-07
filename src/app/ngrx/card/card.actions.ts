import {createAction, props} from '@ngrx/store';
import {LabelModel} from '../../models/label.model';

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

export const updateCardDetail = createAction(
  '[Card] Update  Card Detail',
  props<{
    card: {
      id: string;
      title: string;
      dueDate: Date | null;
      description: string;
    }
  }>(),
);

export const updateCardDetailSuccess = createAction(
  '[Card] Update Card Detail Success',
  props<{
    card: {
      title: string;
      dueDate: Date | null;
      description: string;
    }
  }>(),
);

export const updateCardDetailFailure = createAction(
  '[Card] Update Card Detail Failure',
  props<{ error: string }>(),
);
