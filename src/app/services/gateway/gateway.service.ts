import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {ListModel} from '../../models/list.model';
import {BoardModel} from '../../models/board.model';
import {Observable} from 'rxjs';
import {KanbanSocketService} from '../kanbanSocket/kanban-socket.service';

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  constructor(private socket: KanbanSocketService) {
  }

  message() {
    this.socket.emit('message');
  }

  joinBoard(board: BoardModel, lists: ListModel[]) {
    console.log('joinBoard', {board, lists});
    this.socket.emit('joinBoard', {board, lists});
  }

  leaveBoard(boardId: string) {
    console.log('leaveBoard', boardId);
    this.socket.emit('leaveBoard', {boardId});
  }

  onListChange(boardId: string, lists: ListModel[]) {
    console.log('listChange');
    this.socket.emit('listsChange', {
      boardId,
      lists,
    });
  }

  onBackgroundChange(boardId: string, background: {
                       id: string,
                       fileLocation: string
                     }
  ) {
    this.socket.emit('backgroundChange', {
      boardId,
      background,
    });
  }

  listenBackgroundChange(): Observable<{ boardId: string, background: { id: string; fileLocation: string } }> {
    return this.socket.fromEvent('backgroundChange');
  }

  listenListChange(): Observable<ListModel[]> {
    return this.socket.fromEvent('listsChange');
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }
}
