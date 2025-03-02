import { ListState } from './list.state';
import { createReducer, on } from '@ngrx/store';
import * as listActions from './list.actions';

const initialState: ListState = {
  lists: [],
  isGettingLists: false,
  isGettingListsSuccess: false,
  getListsError: '',

  addListError: '',
  isAddingList: false,
  isAddingListSuccess: false,

  isUpdatingLists: false,
  isUpdatingListsSuccess: false,
  updateListsError: '',

  isUpdatingCard: false,
  isUpdatingCardSuccess: false,
  updateCardError: '',

  isDeletingList: false,
  isDeletingListSuccess: false,
  deleteListError: '',
};

export const listReducer = createReducer(
  initialState,
  on(listActions.addNewList, (state, { type, list, boardId }) => {
    console.log(type);
    return {
      ...state,
      isAddingList: true,
      isAddingListSuccess: false,
      addListError: '',
    };
  }),
  on(listActions.addNewListSuccess, (state, { list }) => {
    return {
      ...state,
      lists: [...state.lists, list],
      isAddingList: false,
      isAddingListSuccess: true,
      addListError: '',
    };
  }),
  on(listActions.addNewListFailure, (state, { error }) => {
    return {
      ...state,
      isAddingList: false,
      isAddingListSuccess: false,
      addListError: error,
    };
  }),
  on(listActions.storeLists, (state, { lists }) => {
    return {
      ...state,
      lists: lists,
    };
  }),
  on(listActions.getLists, (state, { type, boardId }) => {
    return {
      ...state,
      isGettingLists: true,
      isGettingListsSuccess: false,
      getListsError: '',
    };
  }),
  on(listActions.getListsSuccess, (state, { type, lists }) => {
    console.log(type);
    console.log(lists);
    return {
      ...state,
      lists: lists,
      isGettingLists: false,
      isGettingListsSuccess: true,
      getListsError: '',
    };
  }),
  on(listActions.getListsFailure, (state, { error }) => {
    return {
      ...state,
      isGettingLists: false,
      isGettingListsSuccess: false,
      getListsError: error,
    };
  }),
  on(listActions.updatePosition, (state, { type, list, boardId }) => {
    console.log(type);
    return {
      ...state,
      isUpdatingLists: true,
      isUpdatingListsSuccess: false,
      updateListsError: '',
    };
  }),
  on(listActions.updatePositionSuccess, (state, { list, type }) => {
    console.log(type);
    console.log(list);
    return {
      ...state,
      lists: list,
      isUpdatingLists: false,
      isUpdatingListsSuccess: true,
      updateListsError: '',
    };
  }),
  on(listActions.updatePositionFailure, (state, { error, type }) => {
    return {
      ...state,
      isUpdatingLists: false,
      isUpdatingListsSuccess: false,
      updateListsError: error,
    };
  }),

  on(listActions.updateCard, (state, { type }) => {
    return {
      ...state,
      isUpdatingCard: true,
      isUpdatingCardSuccess: false,
      updateCardError: '',
    };
  }),
  on(listActions.updateCardSuccess, (state, { cards, listId, cardId }) => {
    console.log(cards);

    return {
      ...state,
      lists: state.lists.map((list) => {
        if (list.id === listId) {
          return { ...list, cards };
        } else {
          return {
            ...list,
            cards: list.cards
              ? list.cards.filter((card) => card.id !== cardId)
              : [],
          };
        }
      }),
      isUpdatingCardSuccess: true,
      isUpdatingCard: false,
    };
  }),

  on(listActions.deleteList, (state, { type, listId }) => {
    console.log(type);
    console.log(state);
    return {
      ...state,
      isDeletingList: true,
      isDeletingListSuccess: false,
      deleteListError: '',
    };
  }),
  on(listActions.deleteListSuccess, (state, { listId, type }) => {
    console.log(type);
    return {
      ...state,
      lists: state.lists.filter((list) => list.id !== listId),
      isDeletingList: false,
      isDeletingListSuccess: true,
      deleteListError: '',
    };
  }),
  on(listActions.deleteListFailure, (state, { error, type }) => {
    return {
      ...state,
      isDeletingList: false,
      isDeletingListSuccess: false,
      deleteListError: error,
    };
  }),
  on(listActions.clearListStore, (state) => {
    console.log('clearListStore');
    return initialState;
  }),
);
