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

export const replyInviteBoard = createAction(
  '[Notifications] Reply Invite Board',
  props<{ notificationId: string; isAccepted: boolean }>(),
);

export const replyInviteBoardSuccess = createAction(
  '[Notifications] Reply Invite Board Success',
  props<{ notificationId: string }>(),
);

export const replyInviteBoardFailure = createAction(
  '[Notifications] Reply Invite Board Failure',
  props<{ error: any }>(),
);

export const updateIsNewNotifications = createAction(
  '[Notifications] Update Is New Notifications',
  props<{ isNewNotifications: boolean }>(),
);

export const setInvitingUsers = createAction(
  '[Notifications] Set Inviting Users',
  props<{ userIds: string[] }>(),
);

export const clearInvitingUsers = createAction(
  '[Notifications] Clear Inviting Users',
);

export const addAddedToCardUsers = createAction(
  '[Notifications] Add Added To Card Users',
  props<{ userIds: string[] }>(),
);

export const clearAddNewMember = createAction(
  '[Notifications] Clear Add New Member',
);

export const clearNotificationsState = createAction(
  '[Notifications] Clear Notifications State',
);
