import {LabelModel} from '../../models/label.model';

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
}
