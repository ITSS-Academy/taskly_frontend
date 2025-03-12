import { LabelModel } from '../../models/label.model';
import { ListModel } from '../../models/list.model';

export interface ListState {
  lists: ListModel[];
  isGettingLists: boolean;
  isGettingListsSuccess: boolean;
  getListsError: string;

  isAddingList: boolean;
  isAddingListSuccess: boolean;
  addListError: string;

  isUpdatingLists: boolean;
  isUpdatingListsSuccess: boolean;
  updateListsError: string;

  isUpdatingCard: boolean;
  isUpdatingCardSuccess: boolean;
  updateCardError: string;

  isDeletingList: boolean;
  isDeletingListSuccess: boolean;
  deleteListError: string;

  isAddingCard: boolean;
  isAddingCardSuccess: boolean;
  addCardError: string;

  isDeletingCard: boolean;
  isDeletingCardSuccess: boolean;
  deleteCardError: string;

  isFiltering: boolean;
  filterLists: ListModel[];
  filterMembers: string[];
  filterLabels: string[];

  isGettingFilteringCards: boolean;
  isGettingFilteringCardsSuccess: boolean;
  getFilteringCardsError: string;
}
