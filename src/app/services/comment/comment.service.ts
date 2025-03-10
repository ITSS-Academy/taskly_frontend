import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  accessToken!: string

  constructor(private httpClient: HttpClient,
              private store: Store<{ auth: AuthState }>) {
    this.store.select('auth', 'idToken').subscribe((auth) => {
      if (auth) {
        this.accessToken = auth;
      }
    })
  }

  getComments(cardId: string) {
    return this.httpClient.get(`http://localhost:3000/comment/${cardId}`, {
      headers: {Authorization: this.accessToken}
    });
  }

  createComment(comment: { cardId: string; text: string }) {
    return this.httpClient.post(`http://localhost:3000/comment`, comment, {
      headers: {Authorization: this.accessToken}
    });
  }

  deleteComment(commentId: string) {
    return this.httpClient.delete(`http://localhost:3000/comment/${commentId}`, {
      headers: {Authorization: this.accessToken}
    });
  }
}
