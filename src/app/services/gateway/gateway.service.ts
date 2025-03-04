import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {ListModel} from '../../models/list.model';
import {BoardModel} from '../../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(private socket: Socket) {
  }

  message() {
    this.socket.emit('message');
  }

  joinBoard(board: BoardModel, lists: ListModel[]) {
    console.log('joinBoard', {board, lists});
    this.socket.emit('joinBoard', {board, lists},);
  }

  onListDrop(lists: ListModel[]) {
    this.socket.emit('listDrop', lists);
  }
}
