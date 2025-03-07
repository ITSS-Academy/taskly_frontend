import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Store} from '@ngrx/store';
import {ListModel} from '../../models/list.model';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  accesToken!: string;

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ auth: AuthState }>,
  ) {
    this.store.select('auth', 'idToken').subscribe((auth) => {
      if (auth) {
        this.accesToken = auth;
      }
    });
  }

  addNewList(listName: string, boardId: string) {
    return this.httpClient.post(
      `${environment.apiUrl}/list/new-list`,
      {
        listName,
        boardId,
      },
      {headers: {Authorization: this.accesToken}},
    );
  }

  getLists(boardId: string) {
    return this.httpClient.get(`${environment.apiUrl}/list/cards/${boardId}`, {
      headers: {Authorization: this.accesToken},
    });
  }

  updateLists(lists: ListModel[], boardId: string) {
    return this.httpClient.put(
      `${environment.apiUrl}/list/update-lists`,
      {
        lists,
        boardId,
      },
      {headers: {Authorization: this.accesToken}},
    );
  }

  updateListCard(cardId: string, listId: string, cardPosition: number) {
    console.log('update list card');
    return this.httpClient.put(
      `${environment.apiUrl}/list/update-list/card`,
      {
        card: cardId,
        listId,
        position: cardPosition,
      },
      {headers: {Authorization: this.accesToken}},
    );
  }

  deleteList(listId: string) {
    return this.httpClient.delete(`${environment.apiUrl}/list/${listId}`, {
      headers: {Authorization: this.accesToken},
    });
  }

  addTask(title: string, listId: string) {
    console.log(title, listId);
    return this.httpClient.post(
      `${environment.apiUrl}/card`,
      {
        title,
        listId,
      },
      {headers: {Authorization: this.accesToken}},
    );
  }

  deleteTask(cardId: string) {
    return this.httpClient.delete(`${environment.apiUrl}/card/${cardId}`, {
      headers: {Authorization: this.accesToken},
    });
  }
}
