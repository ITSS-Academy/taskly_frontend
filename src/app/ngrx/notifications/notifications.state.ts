export interface NotificationsState {
  notifications: Notification[];
  isGettingNotifications: boolean;
  isGettingNotificationsSuccess: boolean;
  isGettingNotificationsFailure: any;

  isInvitingUser: boolean;
  isInvitingUserSuccess: boolean;
  isInvitingUserFailure: any;
}
