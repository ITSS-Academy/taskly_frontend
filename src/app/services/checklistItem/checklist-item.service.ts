import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';

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
      `http://localhost:3000/checklist-item`,
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
      `http://localhost:3000/checklist-item/toogle`,
      subTask,
      {
        headers: {Authorization: this.accessToken}
      }
    )
  }

  deleteSubTask(checklistItemId: string) {
    return this.httpClient.delete(
      `http://localhost:3000/checklist-item/${checklistItemId}`,
      {
        headers: {Authorization: this.accessToken}
      })
  }
}
