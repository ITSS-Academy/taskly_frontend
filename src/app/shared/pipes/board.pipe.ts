import {Pipe, PipeTransform} from '@angular/core';
import {BoardService} from '../../services/board/board.service';
import {Observable} from 'rxjs';
import {BoardModel} from '../../models/board.model';

@Pipe({
  name: 'board',
  standalone: true
})
export class BoardPipe implements PipeTransform {

  constructor(private boardService: BoardService) {
  }

  transform(boardId: string): Observable<BoardModel> {
    return this.boardService.getBoard(boardId);
  }

}
