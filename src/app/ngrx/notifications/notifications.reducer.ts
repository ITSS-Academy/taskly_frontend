import {NotificationsState} from './notifications.state';
import {createReducer, on} from '@ngrx/store';
import * as notificationsActions from './notifications.actions';

const initialState: NotificationsState = {
  notifications: [],
  isGettingNotifications: false,
  isGettingNotificationsSuccess: false,
  isGettingNotificationsFailure: false,

  isInvitingUser: false,
  isInvitingUserSuccess: false,
  isInvitingUserFailure: false,
}

export const notificationsReducer = createReducer(initialState,
  on(
    notificationsActions.inviteUser, (state) => {
      return {
        ...state,
        isInvitingUser: true,
        isInvitingUserSuccess: false,
        isInvitingUserFailure: false,
      }
    }),

  on(notificationsActions.inviteUserSuccess, (state) => {
    return {
      ...state,
      isInvitingUser: false,
      isInvitingUserSuccess: true,
      isInvitingUserFailure: false,
    }
  }),
  on(notificationsActions.inviteUserFailure, (state, {error}) => {
    return {
      ...state,
      isInvitingUser: false,
      isInvitingUserSuccess: false,
      isInvitingUserFailure: error
    }
  })
);
