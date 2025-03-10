import {ListState} from './list.state';
import {createReducer, on} from '@ngrx/store';
import * as listActions from './list.actions';
import {ChecklistItemModel} from '../../models/checklistItem.model';
import {subtractCommentCount} from './list.actions';

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
    console.log(type);
    return {
      ...state,
      isUpdatingCard: true,
      isUpdatingCardSuccess: false,
      updateCardError: '',
    };
  }),
  on(
    listActions.updateCardSuccess,
    (state, {type, cards, listId, cardId, previousListId, cardPosition}) => {
      console.log(cards);
      console.log(type);
      const list = state.lists.find((l) => l.id === previousListId);
      let card: any;
      if (list) {
        card = list.cards!.find((c) => c.id === cardId);
      }
      console.log(card);

      if (previousListId != listId) {
        return {
          ...state,
          lists: state.lists.map((list) => {
            if (list.id === previousListId) {
              return {
                ...list,
                cards: list.cards
                  ? list.cards.filter((card) => card.id !== cardId)
                  : [],
              };
            }
            if (list.id === listId) {
              return {
                ...list,
                cards: list.cards
                  ? [
                    ...list.cards.slice(0, cardPosition),
                    card,
                    ...list.cards.slice(cardPosition),
                  ]
                  : [card],
              };
            }
            return list;
          }),
          isUpdatingCardSuccess: true,
          isUpdatingCard: false,
        };
      } else {
        return {
          ...state,
          lists: state.lists.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                cards: cards,
              };
            }
            return list;
          }),
          isUpdatingCardSuccess: true,
          isUpdatingCard: false,
        };
      }
    },
  ),
  on(listActions.updateCardFailure, (state, {error, type}) => {
    console.log(error);
    console.log(type);
    return {
      ...state,
      isUpdatingCard: false,
      isUpdatingCardSuccess: false,
      updateCardError: error,
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
    console.log(state.lists);

    return {
      ...state,
      lists: state.lists.map((list) => {
        if (list.id === listId && list.cards) {
          return {...list, cards: [...list.cards, card]};
        } else if (list.id === listId && !list.cards) {
          return {...list, cards: [card]};
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
  }),
  on(listActions.updateLabelToCard, (state, {cardId, labels}) => {
    console.log(cardId);
    console.log(labels);
    console.log(state);
    return {
      ...state,
      lists: state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards
            ? list.cards.map((card) => {
              if (card.id === cardId) {
                return {
                  ...card,
                  labels: card.labels ? card.labels.concat(labels) : labels,
                };
              }
              return card;
            })
            : [],
        };
      }),
    };
  }),
  on(listActions.updateNewCard, (state, {card}) => {
    console.log(card);
    return {
      ...state,
      lists: state.lists.map((list) => {
        if (list.id === card.listId) {
          return {
            ...list,
            cards: list.cards
              ? list.cards.map((c) => {
                if (c.id === card.id) {
                  return {
                    ...c,
                    title: card.title,
                    description: card.description,
                    dueDate: card.dueDate,
                  };
                }
                return c;
              })
              : [],
          };
        }
        return list;
      }),
    };
  }),
  on(listActions.addCSubtaskToCard, (state, {subtask}) => {
    console.log(subtask);
    return {
      ...state,
      lists: state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards
            ? list.cards.map((card) => {
              if (card.id === subtask.cardId) {
                return {
                  ...card,
                  checklistItems: card.checklistItems
                    ? card.checklistItems.concat(subtask)
                    : [subtask],
                };
              }
              return card;
            })
            : [],
        };
      }),
    };
  }),
  on(listActions.toogleChecklistItem, (state, {checklistItem}) => {
    return {
      ...state,
      lists: state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards
            ? list.cards.map((card) => {
              return {
                ...card,
                checklistItems: card.checklistItems
                  ? card.checklistItems.map((item: ChecklistItemModel) => {
                    if (item.id === checklistItem.id) {
                      return checklistItem;
                    }
                    return item;
                  })
                  : [],
              };
            })
            : [],
        };
      }),
    };
  }),
  on(listActions.deleteChecklistItem, (state, {checklistItemId}) => {
    return {
      ...state,
      lists: state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards
            ? list.cards.map((card) => {
              return {
                ...card,
                checklistItems: card.checklistItems
                  ? card.checklistItems.filter(
                    (item: ChecklistItemModel) =>
                      item.id !== checklistItemId,
                  )
                  : [],
              };
            })
            : [],
        };
      }),
    };
  }),
  on(listActions.startUpdateCard, (state) => {
    return {
      ...state,
      isUpdatingCard: true,
      isUpdatingCardSuccess: false,
    };
  }),
  on(listActions.resetUpdatingCardSuccess, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isUpdatingCardSuccess: false,
    };
  }),
  on(listActions.addNewMemberToCard, (state, {cardId, user}) => {
    return {
      ...state,
      lists: state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards
            ? list.cards.map((card) => {
              if (card.id === cardId) {
                return {
                  ...card,
                  members: card.members ? card.members.concat(user) : [user],
                };
              }
              return card;
            })
            : [],
        };
      }),
    };
  }),
  on(listActions.removeMemberFromCard, (state, {cardId, userId}) => {
    return {
      ...state,
      lists: state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards
            ? list.cards.map((card) => {
              if (card.id === cardId) {
                return {
                  ...card,
                  members: card.members
                    ? card.members.filter(
                      (member: any) => member.id !== userId,
                    )
                    : [],
                };
              }
              return card;
            })
            : [],
        };
      }),
    };
  }),
  on(listActions.addCommentCount, (state, {cardId}) => {
    return {
      ...state,
      lists: state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards
            ? list.cards.map((card) => {
              if (card.id === cardId) {
                return {
                  ...card,
                  commentsCount: card.commentsCount
                    ? card.commentsCount + 1
                    : 1,
                };
              }
              return card;
            })
            : [],
        };
      }),
    }
  }),
  on(listActions.subtractCommentCount, (state, {cardId}) => {
    return {
      ...state,
      lists: state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards
            ? list.cards.map((card) => {
              if (card.id === cardId) {
                return {
                  ...card,
                  commentsCount: card.commentsCount
                    ? card.commentsCount - 1
                    : 0,
                };
              }
              return card;
            })
            : [],
        };
      }),
    };
  })
);
