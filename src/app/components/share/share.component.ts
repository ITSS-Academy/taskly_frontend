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
import {
  debounceTime,
  forkJoin,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
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
import { BoardState } from '../../ngrx/board/board.state';
import { UserPipe } from '../../shared/pipes/user.pipe';
import { UserService } from '../../services/user/user.service';
import * as boardActions from '../../ngrx/board/board.actions';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, FormsModule, UserPipe],
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss',
})
export class ShareComponent implements OnInit, OnDestroy {
  userNameSubject = new Subject<string>();

  searchUser$!: Observable<UserModel[]>;
  searchUser!: UserModel;

  subcriptions: Subscription[] = [];

  readonly data = inject<string>(MAT_DIALOG_DATA);
  owener!: string;
  owner!: Observable<UserModel>;
  memberIds!: string[];
  members!: UserModel[];
  boardId!: string;

  constructor(
    private store: Store<{
      user: UserState;
      notifications: NotificationsState;
      board: BoardState;
    }>,
    private notiSocket: NotificationsService,
    private userService: UserService,
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
      this.store.select('board', 'removeUserError').subscribe((error) => {
        if (error) {
          this.openSnackBar(error);
        }
      }),
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.boardId = board.id!;
          this.owener = board.ownerId!;
          this.memberIds = board.members!;
          console.log('new memberids', this.memberIds);
          if (this.memberIds.length > 0) {
            forkJoin(
              this.memberIds.map((member) =>
                this.userService.getUserById(member),
              ),
            ).subscribe((users) => {
              this.members = users;
            });
          } else {
            this.members = [];
          }
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
      this.store.select('user', 'isSearchingUsers').subscribe((loading) => {
        this.isSearchUserLoading = loading;
      }),
    );
    this.owner = this.userService.getUserById(this.owener);
  }

  readonly dialog = inject(MatDialog);

  isSearchUserLoading!: boolean;
  userName!: string;

  onUserNameChange() {
    this.userNameSubject.next(this.userName);
  }

  readonly users = signal<UserModel[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.searchUser) {
        console.log(this.searchUser);
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
        this.userName = '';
        this.store.dispatch(userActions.clearSearchUsers());
      } else if (this.isSearchUserLoading) {
        this.openSnackBar('Searching for user');
      } else {
        this.openSnackBar('Please enter a valid email');
      }
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

  durationInSeconds = 3;

  openSnackBar(content: string) {
    this._snackBar.openFromComponent(ShareSnackbarComponent, {
      data: content,
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnDestroy() {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
    this.subcriptions = [];
    this.store.dispatch(boardActions.clearInviteRemoveUserFromBoardState());
    this.store.dispatch(userActions.clearSearchUsers());
    this.store.dispatch(notificationsActions.clearNotificationsState());
  }

  inviteUsers() {
    if (this.users().length === 0) {
      this.openSnackBar('Please add users to invite');
      return;
    } else {
      this.store.dispatch(
        notificationsActions.inviteUser({
          invitedUser: this.users(),
          boardId: this.data,
        }),
      );
    }
  }

  removeMember(memberId: string) {
    this.store.dispatch(
      boardActions.removeUserFromBoard({
        boardId: this.boardId,
        userId: memberId,
      }),
    );

    this.store.dispatch(
      boardActions.addUserIdsBeKicked({
        boardId: this.boardId,
        userIds: [memberId],
      }),
    );
  }
}
