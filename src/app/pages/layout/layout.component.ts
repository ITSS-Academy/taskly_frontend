import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnDestroy, OnInit {
  constructor(
    private notification: NotificationsService,
    private store: Store<{
      user: UserState;
      notifications: NotificationsState;
      card: CardState;
    }>,
  ) {
    this.store.dispatch(userActions.getUser());
  }

  user!: UserModel;
  subscriptions: Subscription[] = [];
  invitingUsers: string[] = [];
  addedMembers: string[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('user', 'user').subscribe((user) => {
        if (user) {
          this.notification.joinNoti(user.id);
          this.user = user;
        }
      }),
      this.notification.onNewNoti().subscribe(() => {
        console.log('new notification');
        this.store.dispatch(
          notificationsActions.updateIsNewNotifications({
            isNewNotifications: true,
          }),
        );
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
    );
  }

  ngOnDestroy() {
    this.notification.leaveNoti(this.user.id);
    this.store.dispatch(userActions.signOut());
  }
}
