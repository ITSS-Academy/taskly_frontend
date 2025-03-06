import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/auth/auth.state';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  accessToken!: string;

  constructor(
    private store: Store<{
      auth: AuthState;
    }>,
    private http: HttpClient,
  ) {
    this.store.select('auth').subscribe((auth) => {
      this.accessToken = auth.idToken;
    });
  }

  getCard(cardId: string) {
    return this.http.get(`${environment.apiUrl}/card/${cardId}`, {
      headers: {
        Authorization: this.accessToken,
      },
    });
  }
}
