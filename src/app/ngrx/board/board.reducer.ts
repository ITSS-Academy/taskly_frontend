import {BoardState} from './board.state';
import {createReducer, on} from '@ngrx/store';
import * as boardActions from './board.actions';
import {clearBoardBackground} from './board.actions';

const initialState: BoardState = {
  board: null,
  isBoardCreating: false,
  boardCreatingError: null,
  isCreateBoardSuccess: false,

  boards: null,
  isBoardsGetting: false,
  boardsGettingError: null,
  isGetBoardsSuccess: false,

  isGettingBoard: false,
  isGettingBoardSuccess: false,
  getBoardError: '',

  invitedBoards: null,
  isInvitedBoardsGetting: false,
  invitedBoardsGettingError: null,
  isGetInvitedBoardsSuccess: false,

  isChangingBoardBackground: false,
  changeBoardBackgroundError: null,
  isChangeBoardBackgroundSuccess: false,
};

export const boardReducer = createReducer(
  initialState,
  on(boardActions.createBoard, (state) => {
    return {
      ...state,
      isBoardCreating: true,
      boardCreatingError: null,
      isCreateBoardSuccess: false,
    };
  }),
  on(boardActions.createBoardSuccess, (state, {board}) => {
    console.log(board);
    return {
      ...state,
      boards: state.boards ? [board, ...state.boards] : [board],
      isBoardCreating: false,
      boardCreatingError: null,
      isCreateBoardSuccess: true,
    };
  }),
  on(boardActions.createBoardFail, (state, {error}) => {
    return {
      ...state,
      isBoardCreating: false,
      boardCreatingError: error,
      isCreateBoardSuccess: false,
    };
  }),
  on(boardActions.getBoards, (state) => {
    console.log('getBoards');
    return {
      ...state,
      isBoardsGetting: true,
    };
  }),
  on(boardActions.getBoardsSuccess, (state, {boards}) => {
    console.log(boards);
    return {
      ...state,
      boards: boards,
      isBoardsGetting: false,
      boardsGettingError: null,
      isGetBoardsSuccess: true,
    };
  }),
  on(boardActions.getBoardsFail, (state, {error}) => {
    return {
      ...state,
      isBoardsGetting: false,
      boardsGettingError: error,
      isGetBoardsSuccess: false,
    };
  }),
  on(boardActions.getBoard, (state) => {
    console.log('getBoard');
    return {
      ...state,
      board: null,
      isGettingBoard: true,
      isGettingBoardSuccess: false,
      getBoardError: '',
    };
  }),
  on(boardActions.getBoardSuccess, (state, {type, board}) => {
    console.log(type);
    console.log(board);
    return {
      ...state,
      board,
      isGettingBoard: false,
      isGettingBoardSuccess: true,
      getBoardError: '',
    };
  }),
  on(boardActions.getBoardFailure, (state, {errorMessage}) => {
    return {
      ...state,
      isGettingBoard: false,
      isGettingBoardSuccess: false,
      getBoardError: errorMessage,
    };
  }),
  on(boardActions.getInvitedBoards, (state) => {
    return {
      ...state,
      invitedBoards: null,
      isInvitedBoardsGetting: true,
      invitedBoardsGettingError: null,
      isGetInvitedBoardsSuccess: false,
    };
  }),
  on(boardActions.getInvitedBoardsSuccess, (state, {boards}) => {
    return {
      ...state,
      invitedBoards: boards,
      isInvitedBoardsGetting: false,
      invitedBoardsGettingError: null,
      isGetInvitedBoardsSuccess: true,
    };
  }),
  on(boardActions.getInvitedBoardsFail, (state, {error}) => {
    return {
      ...state,
      isInvitedBoardsGetting: false,
      invitedBoardsGettingError: error,
      isGetInvitedBoardsSuccess: false,
    };
  }),
  on(boardActions.acceptInvitation, (state, {board}) => {
    console.log(board);
    return {
      ...state,
      invitedBoards: state.invitedBoards
        ? [board, ...state.invitedBoards]
        : [board],
    };
  }),

  on(boardActions.clearBoardBackground, (state) => {
    return {
      ...state,
      board: null,
    };
  }),
  on(boardActions.changeBoardBackground, (state) => {
    return {
      ...state,
      isChangingBoardBackground: true,
      changeBoardBackgroundError: null,
      isChangeBoardBackgroundSuccess: false,
    };
  }),
  on(boardActions.changeBoardBackgroundSuccess, (state, {boardId, backgroundId, background}) => {
    return {
      ...state,
      board: state.board ? {
        ...state.board,
        backgroundId: backgroundId,
        background: background ? {fileLocation: background.fileLocation} : null,
      } : null,
      boards: state.boards ? state.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            backgroundId: backgroundId,
          };
        }
        return board;
      }) : [],
      isChangingBoardBackground: false,
      changeBoardBackgroundError: null,
      isChangeBoardBackgroundSuccess: true,
    };
  }),
  on(boardActions.changeBoardBackgroundFail, (state, {error}) => {
    return {
      ...state,
      isChangingBoardBackground: false,
      changeBoardBackgroundError: error,
      isChangeBoardBackgroundSuccess: false,
    };
  }),
  on(boardActions.listenBackgroundChange, (state, {background, boardId}) => {
    console.log(background, boardId);
    console.log(state.boards)
    return {
      ...state,
      board: state.board ? {
        ...state.board,
        background: background,
      } : null,
      boards: state.boards ? state.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            background: background,
            backgroundId: background.id,
          };
        }
        return board;
      }) : [],
    }
  })
);
