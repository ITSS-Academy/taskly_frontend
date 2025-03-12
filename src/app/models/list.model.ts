import { LabelModel } from './label.model';
import { ChecklistItemModel } from './checklistItem.model';

export interface ListModel {
  id: string | null;
  title: string;
  createdAt: Date | null;
  cards: any[] | null;
  boardId?: string | null;
}

export interface ListCard {
  id?: string;
  title: string;
  description?: string;
  dueDate?: Date;
  labels?: LabelModel[];
  members?: any[];
  checklistItems?: ChecklistItemModel[];
  commentsCount?: number;
  attachmentsCount?: number;
  list: {
    id: string;
    title: string;
  }
}
