import {createAction, props} from '@ngrx/store';
import {UserModel} from '../../models/user.model';

export const getUser = createAction('[User] Get User');
export const getUserSuccess = createAction('[User] Get User Success', props<{ user: UserModel }>());
export const getUserFailure = createAction('[User] Get User Failure', props<{ errorMessage: string }>());

export const searchUsers = createAction('[User] Search Users', props<{ email: string }>());
export const searchUsersSuccess = createAction('[User] Search Users Success', props<{ users: UserModel[] }>());
export const searchUsersFailure = createAction('[User] Search Users Failure', props<{ errorMessage: string }>());

export const signOut = createAction('[User] Sign Out');

export const clearSearchUsers = createAction('[User] Clear Search Users');
