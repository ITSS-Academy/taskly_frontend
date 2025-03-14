import { Injectable } from '@angular/core';
import { NotiSocketService } from '../notiSocket/noti-socket.service';
import { UserModel } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private socket: NotiSocketService) {}

  joinNoti(userId: string) {
    this.socket.emit('join', userId);
  }

  sendNoti(userId: string) {
    console.log('send noti');
    this.socket.emit('send', { reciever: userId });
  }

  onNewNoti() {
    return this.socket.fromEvent('newNoti');
  }

  leaveNoti(userId: string) {
    this.socket.emit('leave', userId);
  }

  deleteBoard(boardId: string, userIds: string[]) {
    this.socket.emit('deleteBoard', { boardId, userIds });
  }

  onDeletedBoard(): Observable<{
    boardId: string;
    message: string;
  }> {
    return this.socket.fromEvent('boardDeleted');
  }

  acceptBoard(boardId: string, userId: string, receiverId: string) {
    this.socket.emit('acceptInvite', { boardId, userId, receiverId });
  }

  onAcceptedInvite(): Observable<{
    boardId: string;
    userId: string;
  }> {
    return this.socket.fromEvent('acceptedInvite');
  }
}
