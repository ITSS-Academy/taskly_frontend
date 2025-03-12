import { createAction, props } from '@ngrx/store';

export const getBackgrounds = createAction('[Background] Get Backgrounds');

export const getBackgroundsSuccess = createAction(
  '[Background] Get Backgrounds Success',
  props<{
    backgrounds: {
      id: string;
      fileName: string;
      fileLocation: string;
    }[];
  }>(),
);

export const getBackgroundsFailure = createAction(
  '[Background] Get Backgrounds Failure',
  props<{ error: string }>(),
);

export const clearBackroundState = createAction(
  '[Background] Clear Background State',
);
