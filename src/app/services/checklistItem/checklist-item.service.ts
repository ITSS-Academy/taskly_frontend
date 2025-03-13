import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChecklistItemService {

  accessToken!: string;

  constructor(private httpClient: HttpClient,
              private store: Store<{
                auth: AuthState
              }>) {
    this.store.select('auth', 'idToken').subscribe((auth) => {
      if (auth) {
        this.accessToken = auth;
      }
    })
  }

  createSubTask(subTask: {
    title: string;
    cardId: string;
    isCompleted: boolean;
  }) {
    return this.httpClient.post(
      `${environment.apiUrl}/checklist-item`,
      subTask,
      {
        headers: {Authorization: this.accessToken}
      }
    )
  }

  toogleSubTask(subTask: {
    id: string;
    isCompleted: boolean;
  }) {
    return this.httpClient.put(
      `${environment.apiUrl}/checklist-item/toogle`,
      subTask,
      {
        headers: {Authorization: this.accessToken}
      }
    )
  }

  deleteSubTask(checklistItemId: string) {
    return this.httpClient.delete(
      `${environment.apiUrl}/checklist-item/${checklistItemId}`,
      {
        headers: {Authorization: this.accessToken}
      })
  }
}
