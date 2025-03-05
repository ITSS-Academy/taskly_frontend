import {NotificationsState} from './notifications.state';
import {createReducer, on} from '@ngrx/store';
import * as notificationsActions from './notifications.actions';

const initialState: NotificationsState = {
  notifications: [],
  isCanGetMoreNotifications: true,
  isGettingNotifications: false,
  isGettingNotificationsSuccess: false,
  isGettingNotificationsFailure: false,

  isNewNotifications: false,
  isCheckingNewNotifications: false,
  isCheckingNewNotificationsSuccess: false,
  isCheckingNewNotificationsFailure: false,

  isInvitingUser: false,
  isInvitingUserSuccess: false,
  isInvitingUserFailure: false,
};

export const notificationsReducer = createReducer(
  initialState,
  on(notificationsActions.inviteUser, (state) => {
    return {
      ...state,
      isInvitingUser: true,
      isInvitingUserSuccess: false,
      isInvitingUserFailure: false,
    };
  }),

  on(notificationsActions.inviteUserSuccess, (state) => {
    return {
      ...state,
      isInvitingUser: false,
      isInvitingUserSuccess: true,
      isInvitingUserFailure: false,
    };
  }),
  on(notificationsActions.inviteUserFailure, (state, {error}) => {
    return {
      ...state,
      isInvitingUser: false,
      isInvitingUserSuccess: false,
      isInvitingUserFailure: error,
    };
  }),
  on(notificationsActions.getNotifications, (state) => {
    console.log('getNotifications');
    return {
      ...state,
      isGettingNotifications: true,
      isGettingNotificationsSuccess: false,
      isGettingNotificationsFailure: false,
    };
  }),
  on(
    notificationsActions.getNotificationsSuccess,
    (state, {notifications, limit}) => {
      console.log(notifications);
      console.log(limit);
      const isCanGetMoreNotifications = notifications.length == limit;
      return {
        ...state,
        isCanGetMoreNotifications: isCanGetMoreNotifications,
        notifications: [...state.notifications, ...notifications],
        isGettingNotifications: false,
        isGettingNotificationsSuccess: true,
        isGettingNotificationsFailure: false,
      };
    },
  ),
  on(notificationsActions.getNotificationsFailure, (state, {error}) => {
    return {
      ...state,
      isGettingNotifications: false,
      isGettingNotificationsSuccess: false,
      isGettingNotificationsFailure: error,
    };
  }),
  on(notificationsActions.clearNotifications, (state,) => {
    return {
      ...state,
      notifications: [],
      isCanGetMoreNotifications: true,
      isGettingNotifications: false,
      isGettingNotificationsSuccess: false,
      isGettingNotificationsFailure: false,

    }
  }),

  on(notificationsActions.checkNewNotifications, (state) => {
    return {
      ...state,
      isCheckingNewNotifications: true,
      isCheckingNewNotificationsSuccess: false,
      isCheckingNewNotificationsFailure: false,
    };
  }),
  on(
    notificationsActions.checkNewNotificationsSuccess,
    (state, {isNewNotification}) => {
      return {
        ...state,
        isNewNotifications: isNewNotification,
        isCheckingNewNotifications: false,
        isCheckingNewNotificationsSuccess: true,
        isCheckingNewNotificationsFailure: false,
      };
    },
  ),
  on(notificationsActions.checkNewNotificationsFailure, (state, {error}) => {
    return {
      ...state,
      isCheckingNewNotifications: false,
      isCheckingNewNotificationsSuccess: false,
      isCheckingNewNotificationsFailure: error,
    };
  }),
);
