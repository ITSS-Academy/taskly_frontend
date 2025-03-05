import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class KanbanSocketService extends Socket {

  constructor() {
    super({
      url: 'http://localhost:80',
      options: {
        transports: ['websocket'],
      }
    });

  }
}
