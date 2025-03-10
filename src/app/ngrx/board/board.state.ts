import { BoardModel } from '../../models/board.model';

export interface BoardState {
  //createBoard
  board: BoardModel | null;
  isBoardCreating: boolean;
  boardCreatingError: string | null;
  isCreateBoardSuccess: boolean;

  boards: BoardModel[] | null;
  isBoardsGetting: boolean;
  boardsGettingError: string | null;
  isGetBoardsSuccess: boolean;

  //getBoard
  isGettingBoard: boolean;
  isGettingBoardSuccess: boolean;
  getBoardError: string;

  //invitedBoards
  invitedBoards: BoardModel[] | null;
  isInvitedBoardsGetting: boolean;
  invitedBoardsGettingError: string | null;
  isGetInvitedBoardsSuccess: boolean;

  //searchBoards
  searchedBoards: BoardModel[] | null;
  isSearchingBoards: boolean;
  searchBoardsError: string | null;
  isSearchBoardsSuccess: boolean;
}
