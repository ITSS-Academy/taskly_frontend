import {createReducer, on} from '@ngrx/store';
import {LabelState} from './label.state';
import * as labelActions from './label.actions';

const initialState: LabelState = {
  labels: [],
  isCreating: false,
  isCreatedSuccess: false,
  isCreatedFailure: null,

  isGettingLabelsInBoard: false,
  isGetLabelsInBoardSuccess: false,
  isGetLabelsInBoardFailure: null,

  isAddingLabelToTask: false,
  isAddLabelToTaskSuccess: false,
  isAddLabelToTaskFailure: null
}

export const labelReducer = createReducer(initialState,
  on(labelActions.createLabel, (state) => {
    return {
      ...state,
      isCreating: true,
      isCreatedSuccess: false,
      isCreatedFailure: null
    }
  }),
  on(labelActions.createLabelSuccess, (state, {label}) => {
    console.log('label', label);
    return {
      ...state,
      labels: [...state.labels, label],
      isCreating: false,
      isCreatedSuccess: true,
      isCreatedFailure: null
    }
  }),
  on(labelActions.createLabelFailure, (state, {error}) => {
    return {
      ...state,
      isCreating: false,
      isCreatedSuccess: false,
      isCreatedFailure: error
    }
  }),
  on(labelActions.getLabelsInBoard, (state) => {
    return {
      ...state,
      isGettingLabelsInBoard: true,
      isGetLabelsInBoardSuccess: false,
      isGetLabelsInBoardFailure: null
    }
  }),
  on(labelActions.getLabelsInBoardSuccess, (state, {labels}) => {
    return {
      ...state,
      labels: labels,
      isGettingLabelsInBoard: false,
      isGetLabelsInBoardSuccess: true,
      isGetLabelsInBoardFailure: null
    }
  }),
  on(labelActions.getLabelsInBoardFailure, (state, {error}) => {
    return {
      ...state,
      isGettingLabelsInBoard: false,
      isGetLabelsInBoardSuccess: false,
      isGetLabelsInBoardFailure: error,
    }
  }),
  on(labelActions.clearLabelState, (state) => {
    return initialState
  }),
  on(labelActions.addLabelToTask, (state) => {
    return {
      ...state,
      isAddingLabelToTask: true,
      isAddLabelToTaskSuccess: false,
      isAddLabelToTaskFailure: null
    }
  }),
  on(labelActions.addLabelToTaskSuccess, (state, {label}) => {
    return {
      ...state,
      isAddingLabelToTask: false,
      isAddLabelToTaskSuccess: true,
      isAddLabelToTaskFailure: null
    }
  }),
  on(labelActions.addLabelToTaskFailure, (state, {error}) => {
    return {
      ...state,
      isAddingLabelToTask: false,
      isAddLabelToTaskSuccess: false,
      isAddLabelToTaskFailure: error
    }
  })
);
