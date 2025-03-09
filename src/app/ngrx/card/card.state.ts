import { CardModel } from '../../models/card.model';

export interface CardState {
  card: CardModel | null;
  isGettingCard: boolean;
  isGetCardSuccess: boolean;
  isGetCardFailure: any;

  isUpdatingTask: boolean;
  isUpdateTaskSuccess: boolean;
  isUpdateTaskFailure: any;

  isAddingNewMember: boolean;
  isAddNewMemberSuccess: boolean;
  isAddNewMemberFailure: any;

  isRemovingMember: boolean;
  isRemoveMemberSuccess: boolean;
  isRemoveMemberFailure: any;
}
