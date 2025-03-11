import { NotificationsModel } from '../../../../../../donezo_frontend/src/app/models/notifications.model';

export interface NotificationsState {
  notifications: NotificationsModel[];
  isCanGetMoreNotifications: boolean;
  isGettingNotifications: boolean;
  isGettingNotificationsSuccess: boolean;
  isGettingNotificationsFailure: any;

  isNewNotifications: boolean;
  isCheckingNewNotifications: boolean;
  isCheckingNewNotificationsSuccess: boolean;
  isCheckingNewNotificationsFailure: any;

  invitingUsers: string[];
  isInvitingUser: boolean;
  isInvitingUserSuccess: boolean;
  isInvitingUserFailure: any;

  isReplyingInvitation: boolean;
  isReplyingInvitationSuccess: boolean;
  isReplyingInvitationFailure: any;

  addedToCardUsers: string[];
}
