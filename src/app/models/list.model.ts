import {LabelModel} from './label.model';

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
  labels?: any[];
  members?: any[];
  checklistCount?: number;
  commentsCount?: number;
  attachmentsCount?: number;
}
