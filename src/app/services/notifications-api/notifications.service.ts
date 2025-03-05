import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/user.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  accessToken!: string;

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ auth: AuthState }>,
  ) {
    this.store.select('auth', 'idToken').subscribe((auth) => {
      if (auth) {
        this.accessToken = auth;
      }
    });
  }

  inviteUser(users: UserModel[], boardId: string) {
    return this.httpClient.post(
      `${environment.apiUrl}/notifications/board`,
      {users, boardId},
      {
        headers: {Authorization: this.accessToken},
      },
    );
  }

  getNotifications(offset: number, limit: number) {
    return this.httpClient.get(
      `${environment.apiUrl}/notifications/${limit}/${offset}`,
      {
        headers: {Authorization: this.accessToken},
      },
    );
  }
}
