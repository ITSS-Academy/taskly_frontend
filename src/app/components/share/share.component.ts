import {Component, inject, OnInit} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NotificationsComponent} from '../notifications/notifications.component';
import {UserState} from '../../ngrx/user/user.state';
import {Store} from '@ngrx/store';
import {debounceTime, Observable, Subject} from 'rxjs';
import * as userActions from '../../ngrx/user/user.actions';
import {UserModel} from '../../models/user.model';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-share',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    AsyncPipe,
  ],
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss'
})
export class ShareComponent implements OnInit {
  userNameSubject = new Subject<string>();

  searchUser$!: Observable<UserModel[]>

  constructor(private store: Store<{ user: UserState }>) {
  }

  ngOnInit() {
    this.searchUser$ = this.store.select('user', 'searchUsers');

    this.store.select('user', 'searchUsers').subscribe((users) => {
      console.log(users);
    })

    this.userNameSubject.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (value !== '') {
        this.store.dispatch(userActions.searchUsers({email: value}));
      }
    })
  }

  readonly dialog = inject(MatDialog);


  userName!: string;

  onUserNameChange() {
    this.userNameSubject.next(this.userName);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ShareComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
