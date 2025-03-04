import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/user.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  accessToken!: string;

  constructor(private htppClient: HttpClient,
              private store: Store<{ auth: AuthState }>) {
    this.store.select('auth', 'idToken').subscribe((auth) => {
      if (auth) {
        this.accessToken = auth;
      }
    })
  }

  inviteUser(users: UserModel[], boardId: string) {
    return this.htppClient.post('http://localhost:3000/notifications/board', {users, boardId}, {
      headers: {Authorization: this.accessToken}
    });
  }
}
