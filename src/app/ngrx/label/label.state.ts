import { LabelModel } from '../../models/label.model';

export interface LabelState {
  labels: LabelModel[];
  isCreating: boolean;
  isCreatedSuccess: boolean;
  isCreatedFailure: any;

  isGettingLabelsInBoard: boolean;
  isGetLabelsInBoardSuccess: boolean;
  isGetLabelsInBoardFailure: any;

  isAddingLabelToTask: boolean;
  isAddLabelToTaskSuccess: boolean;
  isAddLabelToTaskFailure: any;

  isGettingLabelForFilter: boolean;
  isGetLabelForFilterSuccess: boolean;
  isGetLabelForFilterFailure: any;

  isRemovingLabelFromTask: boolean;
  isRemoveLabelFromTaskSuccess: boolean;
  isRemoveLabelFromTaskFailure: any;

  pendingActions: number;
  isUpdatingLabel: boolean;
  isUpdateLabelSuccess: boolean;
  isUpdateLabelFailure: any;
}
