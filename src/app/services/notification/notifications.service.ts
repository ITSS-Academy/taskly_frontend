import {Injectable} from '@angular/core';
import {NotiSocketService} from '../notiSocket/noti-socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private socket: NotiSocketService) {
  }

}
