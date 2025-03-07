import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {NotificationsService} from '../../services/notification/notifications.service';
import {Store} from '@ngrx/store';
import {UserState} from '../../ngrx/user/user.state';
import * as userActions from '../../ngrx/user/user.actions';
import {NotificationsState} from '../../ngrx/notifications/notifications.state';
import * as notificationsActions from '../../ngrx/notifications/notifications.actions';
import {UserModel} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {CardState} from '../../ngrx/card/card.state';

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
      card: CardState
    }>,
  ) {
    this.store.dispatch(userActions.getUser());
  }

  user!: UserModel;
  subscriptions: Subscription[] = []

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
    )
  }

  ngOnDestroy() {
    this.notification.leaveNoti(this.user.id);
    this.store.dispatch(userActions.signOut());
  }
}
