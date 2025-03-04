import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';
import { NotificationsModel } from '../../models/notifications.model';

export const inviteUser = createAction(
  '[Notifications] Invite User',
  props<{ invitedUser: UserModel[]; boardId: string }>(),
);

export const inviteUserSuccess = createAction(
  '[Notifications] Invite User Success',
);

export const inviteUserFailure = createAction(
  '[Notifications] Invite User Failure',
  props<{ error: any }>(),
);

export const getNotifications = createAction(
  '[Notifications] Get Notifications',
  props<{ offset: number; limit: number }>(),
);

export const getNotificationsSuccess = createAction(
  '[Notifications] Get Notifications Success',
  props<{ notifications: NotificationsModel[]; limit: number }>(),
);

export const getNotificationsFailure = createAction(
  '[Notifications] Get Notifications Failure',
  props<{ error: any }>(),
);

export const checkNewNotifications = createAction(
  '[Notifications] Check New Notifications',
);

export const checkNewNotificationsSuccess = createAction(
  '[Notifications] Check New Notifications Success',
  props<{ isNewNotification: boolean }>(),
);

export const checkNewNotificationsFailure = createAction(
  '[Notifications] Check New Notifications Failure',
  props<{ error: any }>(),
);

export const clearNotifications = createAction(
  '[Notifications] Clear Notifications',
);
