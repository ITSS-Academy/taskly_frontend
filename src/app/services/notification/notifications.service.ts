import { Injectable } from '@angular/core';
import { NotiSocketService } from '../notiSocket/noti-socket.service';
import { NotificationsModel } from '../../models/notifications.model';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private socket: NotiSocketService) {}

  joinNoti(userId: string) {
    this.socket.emit('join', userId);
  }

  sendNoti(user: UserModel) {
    this.socket.emit('send', { reciever: user.id });
  }

  onNewNoti() {
    return this.socket.fromEvent('newNoti');
  }

  leaveNoti(userId: string) {
    this.socket.emit('leave', userId);
  }
}
