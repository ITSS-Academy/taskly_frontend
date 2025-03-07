export interface ChecklistItemModel {
  id?: string;
  title: string;
  isCompleted: boolean;
  cardId: string;
  createdAt?: Date;
}
