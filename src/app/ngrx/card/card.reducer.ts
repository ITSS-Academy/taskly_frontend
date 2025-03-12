import { createReducer, on } from '@ngrx/store';
import { CardState } from './card.state';
import * as cardActions from './card.actions';
import { getMatIconNameNotFoundError } from '@angular/material/icon';

const initialState: CardState = {
  card: null,
  isGettingCard: false,
  isGetCardSuccess: false,
  isGetCardFailure: null,

  isUpdatingTask: false,
  isUpdateTaskSuccess: false,
  isUpdateTaskFailure: null,

  isAddingNewMember: false,
  isAddNewMemberSuccess: false,
  isAddNewMemberFailure: null,

  isRemovingMember: false,
  isRemoveMemberSuccess: false,
  isRemoveMemberFailure: null,

  cards: [],
  isGettingCardsByUser: false,
  isGetCardsByUserSuccess: false,
  isGetCardsByUserFailure: null,
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
  on(cardActions.getCardSuccess, (state, { card }) => {
    return {
      ...state,
      card,
      isGettingCard: false,
      isGetCardSuccess: true,
      isGetCardFailure: null,
    };
  }),
  on(cardActions.getCardFailure, (state, { error }) => {
    return {
      ...state,
      isGettingCard: false,
      isGetCardSuccess: false,
      isGetCardFailure: error,
    };
  }),
  on(cardActions.updateLabel, (state, { labels }) => {
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
  on(cardActions.updateCardDetail, (state, { type, card }) => {
    console.log(type);
    return {
      ...state,
      isUpdatingTask: true,
      isUpdateTaskSuccess: false,
      isUpdateTaskFailure: null,
    };
  }),
  on(cardActions.updateCardDetailSuccess, (state, { card }) => {
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
  on(cardActions.updateCardDetailFailure, (state, { error }) => {
    return {
      ...state,
      isUpdatingTask: false,
      isUpdateTaskSuccess: false,
      isUpdateTaskFailure: error,
    };
  }),
  on(cardActions.addNewChecklistItem, (state, { checklistItem }) => {
    console.log(checklistItem);

    if (checklistItem.isCompleted) {
      //find index of first completed item
      let index = state.card!.checklistItems!.findIndex(
        (item) => item.isCompleted === true,
      );

      if (index === -1) {
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
            checklistItems: state.card!.checklistItems
              ? [...state.card!.checklistItems, checklistItem]
              : [checklistItem],
          },
        };
      } else {
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
            checklistItems: [
              ...state.card!.checklistItems!.slice(0, index),
              checklistItem,
              ...state.card!.checklistItems!.slice(index),
            ],
          },
        };
      }
    } else {
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
          checklistItems: state.card!.checklistItems
            ? [checklistItem, ...state.card!.checklistItems]
            : [checklistItem],
        },
      };
    }
  }),
  on(cardActions.toogleChecklistItem, (state, { checklistItem }) => {
    console.log(checklistItem);

    let index = state.card!.checklistItems!.findIndex(
      (item) => item.isCompleted === true,
    );

    console.log(index);

    const filteredChecklist = state.card!.checklistItems!.filter(
      (item) => item.id !== checklistItem.id,
    );

    if (checklistItem.isCompleted) {
      const newChecklistItems =
        index !== -1
          ? [
              ...filteredChecklist.slice(0, index),
              checklistItem,
              ...filteredChecklist.slice(index),
            ]
          : [...filteredChecklist, checklistItem];

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
          checklistItems: newChecklistItems,
        },
      };
    } else {
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
          checklistItems: [checklistItem, ...filteredChecklist],
        },
      };
    }
  }),
  on(cardActions.deleteChecklistItem, (state, { checklistItemId }) => {
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
        checklistItems: state.card!.checklistItems!.filter(
          (item) => item.id !== checklistItemId,
        ),
      },
    };
  }),
  on(cardActions.addNewMember, (state, { cardId, userId }) => {
    return {
      ...state,
      isAddingNewMember: true,
      isAddNewMemberSuccess: false,
      isAddNewMemberFailure: null,
    };
  }),
  on(cardActions.addNewMemberSuccess, (state, { cardId, user }) => {
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
        members: [...state.card!.members!, user],
        labels: state.card!.labels,
        checklistItems: state.card!.checklistItems,
      },
      isAddingNewMember: false,
      isAddNewMemberSuccess: true,
      isAddNewMemberFailure: null,
    };
  }),
  on(cardActions.addNewMemberFailure, (state, { error }) => {
    console.log(error);
    return {
      ...state,
      isAddingNewMember: false,
      isAddNewMemberSuccess: false,
      isAddNewMemberFailure: error,
    };
  }),
  on(cardActions.removeMember, (state, { cardId, userId }) => {
    return {
      ...state,
      isRemovingMember: true,
      isRemoveMemberSuccess: false,
      isRemoveMemberFailure: null,
    };
  }),
  on(cardActions.removeMemberSuccess, (state, { cardId, userId }) => {
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
        members: state.card!.members!.filter((member) => member.id !== userId),
        labels: state.card!.labels,
        checklistItems: state.card!.checklistItems,
      },
      isRemovingMember: false,
      isRemoveMemberSuccess: true,
      isRemoveMemberFailure: null,
    };
  }),
  on(cardActions.removeMemberFailure, (state, { error }) => {
    return {
      ...state,
      isRemovingMember: false,
      isRemoveMemberSuccess: false,
      isRemoveMemberFailure: error,
    };
  }),
  on(cardActions.clearCardState, (state) => {
    return initialState;
  }),
  on(cardActions.deleteLabelFormCard, (state, { labelIds }) => {
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
        labels: state.card!.labels!.filter(
          (label) => !labelIds.includes(label.id!),
        ),
        checklistItems: state.card!.checklistItems,
      },
    };
  }),
  on(cardActions.getCardsByUserId, (state) => {
    return {
      ...state,
      isGettingCardsByUser: true,
      isGetCardsByUserSuccess: false,
      isGetCardsByUserFailure: null,
    };
  }),
  on(cardActions.getCardsByUserIdSuccess, (state, { cards }) => {
    console.log(cards);
    return {
      ...state,
      cards,
      isGettingCardsByUser: false,
      isGetCardsByUserSuccess: true,
      isGetCardsByUserFailure: null,
    };
  }),
  on(cardActions.getCardsByUserIdFailure, (state, { error }) => {
    return {
      ...state,
      isGettingCardsByUser: false,
      isGetCardsByUserSuccess: false,
      isGetCardsByUserFailure: error,
    };
  }),
);
