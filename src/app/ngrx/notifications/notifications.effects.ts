import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as listActions from '../list/list.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { NotificationsService } from '../../services/notifications/notifications.service';
import * as notificationsActions from './notifications.actions';

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
