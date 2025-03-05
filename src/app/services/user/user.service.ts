import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/auth/auth.state';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  accessToken!: string;

  constructor(
    private store: Store<{
      auth: AuthState;
    }>,
    private httpClient: HttpClient,
  ) {
    this.store.select('auth', 'idToken').subscribe((accessToken) => {
      if (accessToken) {
        this.accessToken = accessToken;
      }
    });
  }

  search(email: string) {
    return this.httpClient.get(
      `${environment.apiUrl}/user/search?email=${email}`,
      {
        headers: {
          Authorization: this.accessToken,
        },
      },
    );
  }
}
