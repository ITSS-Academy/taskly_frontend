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
}
