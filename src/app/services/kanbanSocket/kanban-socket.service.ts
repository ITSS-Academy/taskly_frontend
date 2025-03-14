import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class KanbanSocketService extends Socket {
  constructor() {
    super({
      url: `${environment.wsUrl}/board`,
    });
  }
}
