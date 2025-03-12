import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BoardModel} from '../../models/board.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  accessToken!: string;

  constructor(
    private httpClient: HttpClient,
    private store: Store<{
      auth: AuthState;
    }>,
  ) {
    this.store.select('auth').subscribe((auth) => {
      this.accessToken = auth.idToken;
    });
  }

  createBoard(board: BoardModel) {
    if (board.background instanceof File) {
      const formData = new FormData();
      formData.append('background', board.background);
      formData.append('name', board.name);
      console.log(board);

      return this.httpClient.post(`${environment.apiUrl}/board`, formData, {
        headers: {Authorization: this.accessToken},
      });
    }

    return this.httpClient.post(`${environment.apiUrl}/board`, board);
  }

  getAllBoards() {
    return this.httpClient.get(`${environment.apiUrl}/board/get-all-by-uid`, {
      headers: {Authorization: this.accessToken},
    });
  }

  getBoard(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/board/${id}`, {
      headers: {Authorization: this.accessToken},
    });
  }

  getInvitedBoards() {
    return this.httpClient.get(
      `${environment.apiUrl}/board/get-invited-boards`,
      {
        headers: {Authorization: this.accessToken},
      },
    );
  }

  changeBackground(
    background: {
      backgroundId?: string;
      boardId: string;
    },
    file?: File,
  ): Observable<any> {
    if (file) {
      const formData = new FormData();
      formData.append('background', file);
      formData.append('boardId', background.boardId);
      return this.httpClient.put(
        `${environment.apiUrl}/background/upload`,
        formData,
        {
          headers: {Authorization: this.accessToken},
        },
      );
    } else {
      return this.httpClient.put(
        `${environment.apiUrl}/background/upload`,
        background,
        {
          headers: {Authorization: this.accessToken},
        },
      );
    }
  }

  searchBoards(search: string) {
    return this.httpClient.post(
      `${environment.apiUrl}/board/search`,
      {search},
      {
        headers: {Authorization: this.accessToken},
      },
    );
  }

  changeBoardName(boardId: string, name: string) {
    return this.httpClient.put(
      `${environment.apiUrl}/board/name/${boardId}`,
      {name},
      {
        headers: {Authorization: this.accessToken},
      },
    );
  }

  deleteBoard(boardId: string) {
    return this.httpClient.delete(`${environment.apiUrl}/board/${boardId}`, {
      headers: {Authorization: this.accessToken},
    });
  }
}
