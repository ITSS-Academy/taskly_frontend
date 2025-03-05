import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class NotiSocketService extends Socket {

  constructor() {
    super({
      url: 'http://localhost:81',
      options: {
        transports: ['websocket'],
      }
    });

  }
}
