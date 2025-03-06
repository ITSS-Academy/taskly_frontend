import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as listActions from '../list/list.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { NotificationsService } from '../../services/notifications-api/notifications.service';
import * as notificationsActions from './notifications.actions';
import { NotificationsModel } from '../../models/notifications.model';
import * as boardActions from '../board/board.actions';

export const inviteUser$ = createEffect(
  (
    action$ = inject(Actions),
    notificationsService = inject(NotificationsService),
  ) => {
    return action$.pipe(
      ofType(notificationsActions.inviteUser),
      switchMap(({ boardId, invitedUser }) => {
        return notificationsService.inviteUser(invitedUser, boardId).pipe(
          map(() => notificationsActions.inviteUserSuccess()),
          catchError((error) => {
            return of(
              notificationsActions.inviteUserFailure({
                error: error.error.message || 'Unknown error',
              }),
            );
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const getNotifications$ = createEffect(
  (
    action$ = inject(Actions),
    notificationsService = inject(NotificationsService),
  ) => {
    return action$.pipe(
      ofType(notificationsActions.getNotifications),
      switchMap(({ offset, limit }) => {
        return notificationsService.getNotifications(offset, limit).pipe(
          map((notifications: NotificationsModel[] | any) => {
            // console.log('notifications-api', notifications-api);
            return notificationsActions.getNotificationsSuccess({
              notifications: notifications,
              limit: limit,
            });
          }),
          catchError((error) => {
            return of(
              notificationsActions.getNotificationsFailure({
                error: error.error.message || 'Unknown error',
              }),
            );
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const replyInviteBoard$ = createEffect(
  (
    action$ = inject(Actions),
    notificationsService = inject(NotificationsService),
  ) => {
    return action$.pipe(
      ofType(notificationsActions.replyInviteBoard),
      switchMap(({ notificationId, isAccepted }) => {
        return notificationsService
          .replyInvteBoard(notificationId, isAccepted)
          .pipe(
            mergeMap((board: any) => {
              if (isAccepted) {
                console.log('board', board);
                return of(
                  boardActions.acceptInvitation({ board }),
                  notificationsActions.replyInviteBoardSuccess({
                    notificationId,
                  }),
                );
              } else {
                return of(
                  notificationsActions.replyInviteBoardSuccess({
                    notificationId,
                  }),
                );
              }
            }),
            catchError((error) =>
              of(
                notificationsActions.replyInviteBoardFailure({
                  error: error.error?.message || 'Unknown error',
                }),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const checkNewNotifications$ = createEffect(
  (
    action$ = inject(Actions),
    notificationsService = inject(NotificationsService),
  ) => {
    return action$.pipe(
      ofType(notificationsActions.checkNewNotifications),
      switchMap(() => {
        return notificationsService.checkNewNotifications().pipe(
          map((isNewNotification) => {
            console.log('isNewNotification', isNewNotification);
            return notificationsActions.checkNewNotificationsSuccess({
              isNewNotification,
            });
          }),
          catchError((error) => {
            return of(
              notificationsActions.checkNewNotificationsFailure({
                error: error.error.message || 'Unknown error',
              }),
            );
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);
