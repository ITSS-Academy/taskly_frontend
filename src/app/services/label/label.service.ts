import {Injectable} from '@angular/core';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {LabelModel} from '../../models/label.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  accessToken!: string;

  constructor(
    private store: Store<{
      auth: AuthState;
    }>,
    private httpClient: HttpClient,
  ) {
    this.store.select('auth').subscribe((auth) => {
      this.accessToken = auth.idToken;
    })
  }

  getLabel(id: string): Observable<LabelModel> {
    return this.httpClient.get(`${environment.apiUrl}/board-label/${id}`, {
      headers: {Authorization: this.accessToken},
    }) as Observable<LabelModel>;
  }


}
