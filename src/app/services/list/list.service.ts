import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import { ListModel } from '../../models/list.model';

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

  addNewList(list: ListModel, boardId: string) {
    return this.httpClient.post(
      `http://localhost:3000/list/new-list`,
      {
        list,
        boardId,
      },
      { headers: { Authorization: this.accesToken } },
    );
  }

  getLists(boardId: string) {
    return this.httpClient.get(`http://localhost:3000/list/cards/${boardId}`, {
      headers: { Authorization: this.accesToken },
    });
  }

  updateLists(lists: ListModel[], boardId: string) {
    return this.httpClient.put(
      `http://localhost:3000/list/update-lists`,
      {
        lists,
        boardId,
      },
      { headers: { Authorization: this.accesToken } },
    );
  }

  updateListCard(cardId: string, listId: string, cardPosition: number) {
    return this.httpClient.put(
      `http://localhost:3000/list/update-list/card`,
      {
        card: cardId,
        listId,
        position: cardPosition,
      },
      { headers: { Authorization: this.accesToken } },
    );
  }

  deleteList(listId: string) {
    return this.httpClient.delete(`http://localhost:3000/list/${listId}`, {
      headers: { Authorization: this.accesToken },
    });
  }

  addTask(title: string, listId: string) {
    console.log(title, listId);
    return this.httpClient.post(
      `http://localhost:3000/card`,
      {
        title,
        listId,
      },
      { headers: { Authorization: this.accesToken } },
    );
  }

  deleteTask(cardId: string) {
    return this.httpClient.delete(`http://localhost:3000/card/${cardId}`, {
      headers: { Authorization: this.accesToken },
    });
  }
}
