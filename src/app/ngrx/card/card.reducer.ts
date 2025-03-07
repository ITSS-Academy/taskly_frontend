import {createReducer, on} from '@ngrx/store';
import {CardState} from './card.state';
import * as cardActions from './card.actions';

const initialState: CardState = {
  card: null,
  isGettingCard: false,
  isGetCardSuccess: false,
  isGetCardFailure: null,

  isUpdatingCard: false,
  isUpdateCardSuccess: false,
  isUpdateCardFailure: null,
};

export const cardReducer = createReducer(
  initialState,
  on(cardActions.getCard, (state) => {
    return {
      ...state,
      isGettingCard: true,
      isGetCardSuccess: false,
      isGetCardFailure: null,
    };
  }),
  on(cardActions.getCardSuccess, (state, {card}) => {
    return {
      ...state,
      card,
      isGettingCard: false,
      isGetCardSuccess: true,
      isGetCardFailure: null,
    };
  }),
  on(cardActions.getCardFailure, (state, {error}) => {
    return {
      ...state,
      isGettingCard: false,
      isGetCardSuccess: false,
      isGetCardFailure: error,
    };
  }),
  on(cardActions.updateLabel, (state, {labels}) => {
    console.log(labels);
    return {
      ...state,
      card: {
        ...state.card,
        id: state.card!.id!,
        title: state.card!.title!,
        description: state.card!.description!,
        labels: [...state.card!.labels!, ...labels],
        members: state.card!.members!,
        checklistItems: state.card!.checklistItems!,
        comments: state.card!.comments!,
        attachments: state.card!.attachments!,
        dueDate: state.card!.dueDate!,
      },
    };
  }),
);
