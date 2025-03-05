import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NotificationsService } from '../../services/notification/notifications.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../ngrx/user/user.state';
import * as userActions from '../../ngrx/user/user.actions';
import { NotificationsState } from '../../ngrx/notifications/notifications.state';
import * as notificationsActions from '../../ngrx/notifications/notifications.actions';

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
    }>,
  ) {
    this.store.dispatch(userActions.getUser());
  }

  ngOnInit() {
    this.store.select('user', 'user').subscribe((user) => {
      if (user) {
        this.notification.joinNoti(user.id);
      }
    });
    this.notification.onNewNoti().subscribe((newNoti) => {
      this.store.dispatch(
        notificationsActions.updateIsNewNotifications({
          isNewNotifications: true,
        }),
      );
    });
  }

  ngOnDestroy() {
    this.store.dispatch(userActions.signOut());
  }
}
