import { createReducer, on } from '@ngrx/store';
import { BackgroundState } from './background.state';
import * as backgroundActions from './background.actions';

const initialState: BackgroundState = {
  backgrounds: null,
  isGettingBackgrounds: false,
  isGetBackgroundsSuccess: false,
  getBackgroundsError: null,
};

export const backgroundReducer = createReducer(
  initialState,
  on(backgroundActions.getBackgrounds, (state) => {
    return {
      ...state,
      isGettingBackgrounds: true,
      isGetBackgroundsSuccess: false,
      getBackgroundsError: null,
    };
  }),
  on(backgroundActions.getBackgroundsSuccess, (state, { backgrounds }) => {
    return {
      ...state,
      backgrounds,
      isGettingBackgrounds: false,
      isGetBackgroundsSuccess: true,
      getBackgroundsError: null,
    };
  }),
  on(backgroundActions.getBackgroundsFailure, (state, { error }) => {
    return {
      ...state,
      isGettingBackgrounds: false,
      isGetBackgroundsSuccess: false,
      getBackgroundsError: error,
    };
  }),
  on(backgroundActions.clearBackroundState, () => {
    return initialState;
  }),
);
