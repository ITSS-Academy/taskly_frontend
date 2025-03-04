import {createAction, props} from '@ngrx/store';
import {UserModel} from '../../models/user.model';

export const inviteUser = createAction(
  '[Notifications] Invite User',
  props<{ invitedUser: UserModel[], boardId: string }>()
);

export const inviteUserSuccess = createAction(
  '[Notifications] Invite User Success'
);

export const inviteUserFailure = createAction(
  '[Notifications] Invite User Failure',
  props<{ error: any }>()
);

