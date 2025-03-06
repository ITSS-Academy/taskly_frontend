import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserState } from '../../ngrx/user/user.state';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, Subject, Subscription } from 'rxjs';
import * as userActions from '../../ngrx/user/user.actions';
import { UserModel } from '../../models/user.model';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material.module';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import * as notificationsActions from '../../ngrx/notifications/notifications.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareSnackbarComponent } from '../share-snackbar/share-snackbar.component';
import { NotificationsState } from '../../ngrx/notifications/notifications.state';
import { NotificationsService } from '../../services/notification/notifications.service';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, FormsModule],
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss',
})
export class ShareComponent implements OnInit, OnDestroy {
  userNameSubject = new Subject<string>();

  searchUser$!: Observable<UserModel[]>;
  searchUser!: UserModel;

  subcriptions: Subscription[] = [];

  readonly data = inject<string>(MAT_DIALOG_DATA);

  constructor(
    private store: Store<{
      user: UserState;
      notifications: NotificationsState;
    }>,
    private notiSocket: NotificationsService,
  ) {
    console.log(this.data);
  }

  ngOnInit() {
    this.searchUser$ = this.store.select('user', 'searchUsers');

    this.subcriptions.push(
      this.store.select('user', 'searchUsers').subscribe((users) => {
        if (users.length > 0) {
          this.searchUser = users[0];
        }
      }),

      this.userNameSubject.pipe(debounceTime(500)).subscribe((value) => {
        if (value !== '') {
          this.store.dispatch(userActions.searchUsers({ email: value }));
        }
      }),
      this.store
        .select('notifications', 'isInvitingUserSuccess')
        .subscribe((success) => {
          if (success) {
            this.openSnackBar('Invited users successfully');
          }
        }),
      this.store
        .select('notifications', 'isInvitingUserFailure')
        .subscribe((failure) => {
          if (failure) {
            this.openSnackBar(failure);
          }
        }),
    );
  }

  readonly dialog = inject(MatDialog);

  userName!: string;

  onUserNameChange() {
    this.userNameSubject.next(this.userName);
  }

  readonly users = signal<UserModel[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.searchUser) {
        //check is in this.users()
        for (let i = 0; i < this.users().length; i++) {
          if (this.users()[i].email === this.searchUser.email) {
            this.announcer.announce(`User already added`);
            return;
          }
        }

        const updatedUsers = [...this.users(), this.searchUser];
        this.users.set(updatedUsers);
        this.announcer.announce(`Added ${this.searchUser.email}`);
      } else {
        this.announcer.announce(`User not found`);
      }
      this.userName = '';
      this.store.dispatch(userActions.clearSearchUsers());
    }
  }

  remove(user: UserModel): void {
    this.users.update((users) => {
      const index = users.indexOf(user);
      if (index < 0) {
        return users;
      }

      users.splice(index, 1);
      this.announcer.announce(`Removed ${user.name}`);
      return [...users];
    });
  }

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  openSnackBar(content: string) {
    this._snackBar.openFromComponent(ShareSnackbarComponent, {
      data: content,
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnDestroy() {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
    this.subcriptions = [];
  }

  inviteUsers() {
    this.store.dispatch(
      notificationsActions.inviteUser({
        invitedUser: this.users(),
        boardId: this.data,
      }),
    );
    for (let i = 0; i < this.users().length; i++) {
      this.notiSocket.sendNoti(this.users()[i]);
    }
  }
}
