import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { NotificationsState } from '../../ngrx/notifications/notifications.state';
import { Store } from '@ngrx/store';
import * as notificationsActions from '../../ngrx/notifications/notifications.actions';
import { NotificationsService } from '../../services/notification/notifications.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { UserPipe } from '../../shared/pipes/user.pipe';
import { BoardPipe } from '../../shared/pipes/board.pipe';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { BoardModel } from '../../models/board.model';
import { BoardService } from '../../services/board/board.service';
import { UserService } from '../../services/user/user.service';
import * as boardActions from '../../ngrx/board/board.actions';
import { NotificationsModel } from '../../models/notifications.model';

@Component({
  selector: 'app-notifications-api',
  standalone: true,
  imports: [
    MaterialModule,
    JsonPipe,
    UserPipe,
    AsyncPipe,
    BoardPipe,
    NgxSkeletonLoaderComponent,
    DatePipe,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit, OnDestroy {
  limit = 10;
  offset = 0;

  isGettingNotifications!: boolean;
  canGetMoreNotifications = true;

  subcriptions: Subscription[] = [];

  constructor(
    private store: Store<{ notifications: NotificationsState }>,
    private notificationsSocket: NotificationsService,
    private boardService: BoardService,
    private userService: UserService,
  ) {
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
          this.notiArray = notifications.map((newNoti) => {
            const oldNoti = this.notiArray.find((n) => n.id === newNoti.id);
            return {
              ...newNoti,
              ...oldNoti,
            };
          });
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
      this.store
        .select('notifications', 'isGettingNotificationsSuccess')
        .subscribe((isGettingNotificationsSuccess) => {
          if (isGettingNotificationsSuccess) {
            this.store.dispatch(notificationsActions.checkNewNotifications());
          }
        }),
    );
  }

  // getBoardAndUser(offset: number, limit: number) {
  //   let dataArray = this.notiArray
  //     .slice(offset, offset + limit + 1)
  //     .map((noti) => ({...noti}));
  //
  //   console.log(dataArray);
  //   console.log(dataArray.length);
  //   console.log(dataArray[0]);
  //   console.log(this.notiArray);
  //
  //   if (dataArray.length === 0) return;
  //
  //   const boardRequests = dataArray.map((noti) =>
  //     this.boardService.getBoard(noti.boardId!),
  //   );
  //   const userRequests = dataArray.map((noti) =>
  //     this.userService.getUserById(noti.senderId),
  //   );
  //
  //   forkJoin([forkJoin(boardRequests), forkJoin(userRequests)]).subscribe(
  //     ([boards, users]) => {
  //       const updatedDataArray = dataArray.map((noti, index) => ({
  //         ...noti,
  //         board: boards[index],
  //         sender: users[index],
  //       }));
  //
  //       // Update the notiArray with new data
  //       this.notiArray = [
  //         ...this.notiArray.slice(0, offset),
  //         ...updatedDataArray,
  //       ];
  //     },
  //   );
  // }

  ngOnDestroy() {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

  notiArray: NotificationsModel[] = [];

  onScroll(event: any) {
    const target = event.target;
    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 100;

    console.log(
      bottomReached,
      !this.isGettingNotifications,
      this.canGetMoreNotifications,
    );

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
    // this.store.dispatch(notificationsActions.checkNewNotifications());
  }

  acceptInvitation(notificationId: string) {
    this.store.dispatch(
      notificationsActions.replyInviteBoard({
        notificationId,
        isAccepted: true,
      }),
    );
  }

  rejectInvitation(notificationId: string) {
    this.store.dispatch(
      notificationsActions.replyInviteBoard({
        notificationId,
        isAccepted: false,
      }),
    );
  }
}
