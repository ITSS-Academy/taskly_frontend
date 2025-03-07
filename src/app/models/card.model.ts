import {ChecklistItemModel} from './checklistItem.model';
import {LabelModel} from './label.model';
import {CommentModel} from './comment.model';
import {UserModel} from './user.model';

export interface CardModel {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  labels: LabelModel[] | null;
  members: UserModel[]
    | null;
  checklistItems: ChecklistItemModel[] | null;
  comments: CommentModel[] | null;
  attachments: any[] | null;
}
