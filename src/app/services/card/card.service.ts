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

  updateCard(card: {
    id: string;
    title: string;
    description: string;
    dueDate: Date | null;
  }) {
    console.log('call update card');
    return this.http.put(`${environment.apiUrl}/card`, card, {
      headers: {
        Authorization: this.accessToken,
      },
    });
  }

  addNewMember(cardId: string, userId: string) {
    return this.http.post(
      `${environment.apiUrl}/card/add-new-member`,
      { cardId, userId },
      {
        headers: {
          Authorization: this.accessToken,
        },
      },
    );
  }

  removeMember(cardId: string, userId: string) {
    return this.http.put(
      `${environment.apiUrl}/card/remove-member`,
      {
        cardId,
        userId,
      },
      {
        headers: {
          Authorization: this.accessToken,
        },
      },
    );
  }
}
