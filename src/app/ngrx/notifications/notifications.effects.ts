import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as listActions from '../list/list.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { NotificationsService } from '../../services/notifications/notifications.service';
import * as notificationsActions from './notifications.actions';
import { NotificationsModel } from '../../models/notifications.model';

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
            // console.log('notifications', notifications);
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
