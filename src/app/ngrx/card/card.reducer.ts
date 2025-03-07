import {createReducer, on} from '@ngrx/store';
import {CardState} from './card.state';
import * as cardActions from './card.actions';

const initialState: CardState = {
  card: null,
  isGettingCard: false,
  isGetCardSuccess: false,
  isGetCardFailure: null,

  isUpdatingTask: false,
  isUpdateTaskSuccess: false,
  isUpdateTaskFailure: null,
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
  on(cardActions.updateCardDetail, (state, {type, card}) => {
    console.log(type);
    return {
      ...state,
      isUpdatingTask: true,
      isUpdateTaskSuccess: false,
      isUpdateTaskFailure: null,
    };
  }),
  on(cardActions.updateCardDetailSuccess, (state, {card}) => {
    return {
      ...state,
      card: {
        ...state.card,
        id: state.card!.id,
        title: card.title,
        description: card.description,
        labels: state.card!.labels,
        members: state.card!.members,
        checklistItems: state.card!.checklistItems,
        comments: state.card!.comments,
        attachments: state.card!.attachments,
        dueDate: card.dueDate,
      },
      isUpdatingTask: false,
      isUpdateTaskSuccess: true,
      isUpdateTaskFailure: null,
    };
  }),
  on(cardActions.updateCardDetailFailure, (state, {error}) => {
    return {
      ...state,
      isUpdatingTask: false,
      isUpdateTaskSuccess: false,
      isUpdateTaskFailure: error,
    };
  }),
  on(cardActions.addNewChecklistItem, (state, {checklistItem}) => {
    console.log(checklistItem);
    return {
      ...state,
      card: {
        ...state.card,
        id: state.card!.id,
        title: state.card!.title,
        description: state.card!.description,
        comments: state.card!.comments,
        attachments: state.card!.attachments,
        dueDate: state.card!.dueDate,
        members: state.card!.members,
        labels: state.card!.labels,
        checklistItems: state.card!.checklistItems ? [...state.card!.checklistItems, checklistItem] : [checklistItem],
      },
    };
  }),
  on(cardActions.toogleChecklistItem, (state, {checklistItem}) => {
    return {
      ...state,
      card: {
        ...state.card,
        id: state.card!.id,
        title: state.card!.title,
        description: state.card!.description,
        comments: state.card!.comments,
        attachments: state.card!.attachments,
        dueDate: state.card!.dueDate,
        members: state.card!.members,
        labels: state.card!.labels,
        checklistItems: state.card!.checklistItems!.map((item) => {
          if (item.id === checklistItem.id) {
            return {
              ...item,
              isCompleted: !item.isCompleted,
            };
          }
          return item;
        }),
      },
    };
  }),
  on(cardActions.deleteChecklistItem, (state, {checklistItemId}) => {
    return {
      ...state,
      card: {
        ...state.card,
        id: state.card!.id,
        title: state.card!.title,
        description: state.card!.description,
        comments: state.card!.comments,
        attachments: state.card!.attachments,
        dueDate: state.card!.dueDate,
        members: state.card!.members,
        labels: state.card!.labels,
        checklistItems: state.card!.checklistItems!.filter((item) => item.id !== checklistItemId),
      },
    }
  })
);

