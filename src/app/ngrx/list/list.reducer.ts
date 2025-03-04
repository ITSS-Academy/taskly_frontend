import {ListState} from './list.state';
import {createReducer, on} from '@ngrx/store';
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

  isAddingCard: false,
  isAddingCardSuccess: false,
  addCardError: '',

  isDeletingCard: false,
  isDeletingCardSuccess: false,
  deleteCardError: '',
};

export const listReducer = createReducer(
  initialState,
  on(listActions.addNewList, (state, {type, listName, boardId}) => {
    console.log(type);
    return {
      ...state,
      isAddingList: true,
      isAddingListSuccess: false,
      addListError: '',
    };
  }),
  on(listActions.addNewListSuccess, (state, {list}) => {
    return {
      ...state,
      lists: [...state.lists, list],
      isAddingList: false,
      isAddingListSuccess: true,
      addListError: '',
    };
  }),
  on(listActions.addNewListFailure, (state, {error}) => {
    return {
      ...state,
      isAddingList: false,
      isAddingListSuccess: false,
      addListError: error,
    };
  }),
  on(listActions.storeLists, (state, {lists}) => {
    return {
      ...state,
      lists: lists,
    };
  }),
  on(listActions.getLists, (state, {type, boardId}) => {
    return {
      ...state,
      isGettingLists: true,
      isGettingListsSuccess: false,
      getListsError: '',
    };
  }),
  on(listActions.getListsSuccess, (state, {type, lists}) => {
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
  on(listActions.getListsFailure, (state, {error}) => {
    return {
      ...state,
      isGettingLists: false,
      isGettingListsSuccess: false,
      getListsError: error,
    };
  }),
  on(listActions.updatePosition, (state, {type, list, boardId}) => {
    console.log(type);
    return {
      ...state,
      isUpdatingLists: true,
      isUpdatingListsSuccess: false,
      updateListsError: '',
    };
  }),
  on(listActions.updatePositionSuccess, (state, {lists, type}) => {
    console.log(type);
    console.log(lists);

    // Giữ lại những card trong lists
    const newList = lists.map((list) => {
      if (state.lists) {
        const foundList = state.lists.find((l) => l.id === list.id);
        const cards = foundList ? foundList.cards : []; // Nếu không tìm thấy, gán rỗng
        return {...list, cards};
      }
      return list;
    });

    return {
      ...state,
      lists: newList, // Cập nhật lại danh sách mới
      isUpdatingLists: false,
      isUpdatingListsSuccess: true,
      updateListsError: '',
    };
  }),

  on(listActions.updatePositionFailure, (state, {error, type}) => {
    return {
      ...state,
      isUpdatingLists: false,
      isUpdatingListsSuccess: false,
      updateListsError: error,
    };
  }),

  on(listActions.updateCard, (state, {type}) => {
    return {
      ...state,
      isUpdatingCard: true,
      isUpdatingCardSuccess: false,
      updateCardError: '',
    };
  }),
  on(listActions.updateCardSuccess, (state, {cards, listId, cardId}) => {
    console.log(cards);

    return {
      ...state,
      lists: state.lists.map((list) => {
        if (list.id === listId) {
          return {...list, cards};
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

  on(listActions.deleteList, (state, {type, listId}) => {
    console.log(type);
    console.log(state);
    return {
      ...state,
      isDeletingList: true,
      isDeletingListSuccess: false,
      deleteListError: '',
    };
  }),
  on(listActions.deleteListSuccess, (state, {listId, type}) => {
    console.log(type);
    return {
      ...state,
      lists: state.lists.filter((list) => list.id !== listId),
      isDeletingList: false,
      isDeletingListSuccess: true,
      deleteListError: '',
    };
  }),
  on(listActions.deleteListFailure, (state, {error, type}) => {
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

  on(listActions.addCard, (state, {card, listId}) => {
    return {
      ...state,
      isAddingCard: true,
      isAddingCardSuccess: false,
      addCardError: '',
    };
  }),
  on(listActions.addCardSuccess, (state, {card, listId}) => {
    return {
      ...state,
      lists: state.lists.map((list) => {
        if (list.id === listId && list.cards) {
          return {...list, cards: [...list.cards, card]};
        }
        return list;
      }),
      isAddingCard: false,
      isAddingCardSuccess: true,
      addCardError: '',
    };
  }),

  on(listActions.addCardFailure, (state, {error}) => {
    return {
      ...state,
      isAddingCard: false,
      isAddingCardSuccess: false,
      addCardError: error,
    };
  }),

  on(listActions.deleteCard, (state, {cardId}) => {
    return {
      ...state,
      isDeletingCard: true,
      isDeletingCardSuccess: false,
    };
  }),
  on(listActions.deleteCardSuccess, (state, {cardId}) => {
    return {
      ...state,
      lists: state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards
            ? list.cards.filter((card) => card.id !== cardId)
            : [],
        };
      }),
      isDeletingCard: false,
      isDeletingCardSuccess: true,
    };
  }),
  on(listActions.deleteCardFailure, (state, {error}) => {
    return {
      ...state,
      isDeletingCard: false,
      isDeletingCardSuccess: false,
      deleteCardError: error,
    };
  }),
  on(listActions.storeNewLists, (state, {lists}) => {
    return {
      ...state,
      lists: lists,
    };
  })
);
