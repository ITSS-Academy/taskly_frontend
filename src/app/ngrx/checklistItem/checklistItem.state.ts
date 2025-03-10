import {ChecklistItemModel} from '../../models/checklistItem.model';

export interface ChecklistItemState {
  isAddingChecklistItem: boolean;
  isAddChecklistItemSuccess: boolean;
  isAddChecklistItemFailure: string | null;

  isTogglingChecklistItem: boolean;
  isToggleChecklistItemSuccess: boolean;
  isToggleChecklistItemFailure: string | null;

  isDeletingChecklistItem: boolean;
  isDeleteChecklistItemSuccess: boolean;
  isDeleteChecklistItemFailure: string | null;
}
