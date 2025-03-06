export interface NotificationsModel {
  id?: string;
  type?: string;
  createdAt: Date;
  read: boolean;
  boardId?: string;
  cardId?: string;
  userId: string;
  senderId: string;
  senderName?: string;
  boardName?: string;
  cardTitle?: string;
}
