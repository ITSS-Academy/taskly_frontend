import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NotificationsService } from '../../services/notification/notifications.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../ngrx/user/user.state';
import * as userActions from '../../ngrx/user/user.actions';
import { NotificationsState } from '../../ngrx/notifications/notifications.state';
import * as notificationsActions from '../../ngrx/notifications/notifications.actions';
import { UserModel } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { CardState } from '../../ngrx/card/card.state';
import * as cardActions from '../../ngrx/card/card.actions';
import { clearAddNewMember } from '../../ngrx/notifications/notifications.actions';
import * as boardActions from '../../ngrx/board/board.actions';
import { BoardState } from '../../ngrx/board/board.state';
import { ShareSnackbarComponent } from '../../components/share-snackbar/share-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnDestroy, OnInit {
  boardId!: string;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private notification: NotificationsService,
    private router: Router,
    private store: Store<{
      user: UserState;
      notifications: NotificationsState;
      card: CardState;
      board: BoardState;
    }>,
  ) {
    this.store.dispatch(userActions.getUser());
  }

  user!: UserModel;
  subscriptions: Subscription[] = [];
  invitingUsers: string[] = [];
  addedMembers: string[] = [];
  kickMembers: string[] = [];
  kickedBoard: string = '';

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('user', 'user').subscribe((user) => {
        if (user) {
          this.notification.joinNoti(user.id);
          this.user = user;
        }
      }),
      this.store.select('board', 'kickedUserIds').subscribe((users) => {
        this.kickMembers = users;
      }),
      this.store.select('board', 'kickedBoard').subscribe((boardId) => {
        this.kickedBoard = boardId;
      }),
      this.notification.onNewNoti().subscribe(() => {
        console.log('new notification');
        this.store.dispatch(
          notificationsActions.updateIsNewNotifications({
            isNewNotifications: true,
          }),
        );
      }),
      this.notification.onAcceptedInvite().subscribe((payload) => {
        console.log(payload);
        console.log('accepted invite');
        if (payload.userId && payload.boardId) {
          //add user to board
          this.store.dispatch(
            boardActions.addNewMemberToBoard({
              userId: payload.userId,
              boardId: payload.boardId,
            }),
          );

          this.store.dispatch(
            notificationsActions.updateIsNewNotifications({
              isNewNotifications: true,
            }),
          );
        }
      }),
      this.store.select('notifications', 'invitingUsers').subscribe((users) => {
        this.invitingUsers = users;
      }),
      this.store
        .select('notifications', 'isInvitingUserSuccess')
        .subscribe((isInvitingUserSuccess) => {
          if (isInvitingUserSuccess) {
            this.invitingUsers.map((user) => {
              this.notification.sendNoti(user);
            });
            this.store.dispatch(notificationsActions.clearInvitingUsers());
          }
        }),
      this.store
        .select('notifications', 'addedToCardUsers')
        .subscribe((users) => {
          this.addedMembers = users;
        }),
      this.store
        .select('card', 'isAddNewMemberSuccess')
        .subscribe((isAddNewMemberSuccess) => {
          if (isAddNewMemberSuccess) {
            this.addedMembers.map((member) => {
              this.notification.sendNoti(member);
            });
            this.store.dispatch(notificationsActions.clearAddNewMember());
          }
        }),
      this.store
        .select('card', 'isRemoveMemberSuccess')
        .subscribe((isRemoveMemberSuccess) => {
          if (isRemoveMemberSuccess) {
            this.addedMembers.map((member) => {
              this.notification.sendNoti(member);
            });
            this.store.dispatch(notificationsActions.clearAddNewMember());
          }
        }),
      this.store
        .select('board', 'isDeleteBoardSuccess')
        .subscribe((success) => {
          if (success) {
            console.log(this.kickMembers, this.kickedBoard);
            this.notification.deleteBoard(this.kickedBoard, this.kickMembers);
            this.store.dispatch(
              boardActions.addUserIdsBeKicked({ boardId: '', userIds: [] }),
            );
          }
        }),
      this.store.select('board', 'isRemoveUserSuccess').subscribe((success) => {
        if (success) {
          this.notification.deleteBoard(this.kickedBoard, this.kickMembers);
          this.store.dispatch(
            boardActions.addUserIdsBeKicked({ boardId: '', userIds: [] }),
          );
        }
      }),
      this.notification.onDeletedBoard().subscribe((payload) => {
        this._snackBar.openFromComponent(ShareSnackbarComponent, {
          data: payload.message,
          duration: 3 * 1000,
        });
        this.store.dispatch(boardActions.getInvitedBoards());
        if (this.router.url.includes(payload.boardId)) {
          this.router.navigate(['/home']);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.notification.leaveNoti(this.user.id);
    this.store.dispatch(userActions.signOut());
  }
}
