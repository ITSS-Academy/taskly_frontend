import { createReducer, on } from '@ngrx/store';
import { ChecklistItemState } from './checklistItem.state';
import * as checklistItemActions from './checklistItem.actions';

const initialState: ChecklistItemState = {
  isAddingChecklistItem: false,
  isAddChecklistItemSuccess: false,
  isAddChecklistItemFailure: null,

  isTogglingChecklistItem: false,
  isToggleChecklistItemSuccess: false,
  isToggleChecklistItemFailure: null,

  isDeletingChecklistItem: false,
  isDeleteChecklistItemSuccess: false,
  isDeleteChecklistItemFailure: null,
};

export const checklistItemReducer = createReducer(
  initialState,
  on(checklistItemActions.addNewChecklistItem, (state) => {
    return {
      ...state,
      isAddingChecklistItem: true,
      isAddChecklistItemSuccess: false,
      isAddChecklistItemFailure: null,
    };
  }),
  on(checklistItemActions.addNewChecklistItemSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isAddingChecklistItem: false,
      isAddChecklistItemSuccess: true,
      isAddChecklistItemFailure: null,
    };
  }),
  on(checklistItemActions.addNewChecklistItemFailure, (state, { error }) => {
    return {
      ...state,
      isAddingChecklistItem: false,
      isAddChecklistItemSuccess: false,
      isAddChecklistItemFailure: error,
    };
  }),
  on(checklistItemActions.toggleChecklistItem, (state) => {
    return {
      ...state,
      isTogglingChecklistItem: true,
      isToggleChecklistItemSuccess: false,
      isToggleChecklistItemFailure: null,
    };
  }),
  on(checklistItemActions.toggleChecklistItemSuccess, (state) => {
    return {
      ...state,
      isTogglingChecklistItem: false,
      isToggleChecklistItemSuccess: true,
      isToggleChecklistItemFailure: null,
    };
  }),
  on(checklistItemActions.toggleChecklistItemFailure, (state, { error }) => {
    return {
      ...state,
      isTogglingChecklistItem: false,
      isToggleChecklistItemSuccess: false,
      isToggleChecklistItemFailure: error,
    };
  }),
  on(checklistItemActions.deleteChecklistItem, (state) => {
    return {
      ...state,
      isDeletingChecklistItem: true,
      isDeleteChecklistItemSuccess: false,
      isDeleteChecklistItemFailure: null,
    };
  }),
  on(checklistItemActions.deleteChecklistItemSuccess, (state) => {
    return {
      ...state,
      isDeletingChecklistItem: false,
      isDeleteChecklistItemSuccess: true,
      isDeleteChecklistItemFailure: null,
    };
  }),
  on(checklistItemActions.deleteChecklistItemFailure, (state, { error }) => {
    return {
      ...state,
      isDeletingChecklistItem: false,
      isDeleteChecklistItemSuccess: false,
      isDeleteChecklistItemFailure: error,
    };
  }),
  on(checklistItemActions.clearChecklistItemState, (state) => {
    return initialState;
  }),
);
