import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ListModel } from '../../models/list.model';
import { BoardModel } from '../../models/board.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  constructor(private socket: Socket) {}

  message() {
    this.socket.emit('message');
  }

  joinBoard(board: BoardModel, lists: ListModel[]) {
    console.log('joinBoard', { board, lists });
    this.socket.emit('joinBoard', { board, lists });
  }

  leaveBoard(boardId: string) {
    console.log('leaveBoard', boardId);
    this.socket.emit('leaveBoard', { boardId });
  }

  onListChange(boardId: string, lists: ListModel[]) {
    console.log('listChange');
    this.socket.emit('listsChange', {
      boardId,
      lists,
    });
  }

  listenListChange(): Observable<ListModel[]> {
    return this.socket.fromEvent('listsChange');
  }
}
