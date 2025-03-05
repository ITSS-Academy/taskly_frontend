import {Component, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {NotificationsState} from '../../ngrx/notifications/notifications.state';
import {Store} from '@ngrx/store';
import * as notificationsActions from '../../ngrx/notifications/notifications.actions';
import {Subscription} from 'rxjs';
import {NotificationsModel} from '../../models/notifications.model';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {UserPipe} from '../../shared/pipes/user.pipe';
import {BoardPipe} from '../../shared/pipes/board.pipe';
import {NgxSkeletonLoaderComponent} from 'ngx-skeleton-loader';

@Component({
  selector: 'app-notifications-api',
  standalone: true,
  imports: [MaterialModule, JsonPipe, UserPipe, AsyncPipe, BoardPipe, NgxSkeletonLoaderComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit, OnDestroy {
  limit = 10;
  offset = 0;

  isGettingNotifications!: boolean;
  canGetMoreNotifications = true;

  subcriptions: Subscription[] = [];

  constructor(private store: Store<{ notifications: NotificationsState }>) {
    this.store.dispatch(
      notificationsActions.getNotifications({
        offset: this.offset,
        limit: this.limit,
      }),
    );
  }

  ngOnInit() {
    this.subcriptions.push(
      this.store
        .select('notifications', 'notifications')
        .subscribe((notifications) => {
          this.notiArray = notifications;
        }),
      this.store
        .select('notifications', 'isGettingNotifications')
        .subscribe((isGettingNotifications) => {
          this.isGettingNotifications = isGettingNotifications;
        }),
      this.store
        .select('notifications', 'isCanGetMoreNotifications')
        .subscribe((canGetMoreNotifications) => {
          this.canGetMoreNotifications = canGetMoreNotifications;
        }),
    );
  }

  ngOnDestroy() {
  }

  notiArray: NotificationsModel[] = [];

  onScroll(event: any) {
    const target = event.target;
    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 100;

    if (
      bottomReached &&
      !this.isGettingNotifications &&
      this.canGetMoreNotifications
    ) {
      this.loadMore();
    }
  }

  loadMore() {
    this.offset += this.limit;
    this.store.dispatch(
      notificationsActions.getNotifications({
        offset: this.offset,
        limit: this.limit,
      }),
    );
  }
}
