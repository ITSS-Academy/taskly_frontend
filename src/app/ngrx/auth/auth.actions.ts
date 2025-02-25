import {createAction, props} from '@ngrx/store';

export const storeAccessToken = createAction('[Auth] Store Access Token', props<{ accessToken: string }>())

export const login = createAction('[Auth] Login')
export const loginSuccess = createAction('[Auth] Login Success', props<{ accessToken: string }>())
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>())

export const logout = createAction('[Auth] Logout')
export const logoutSuccess = createAction('[Auth] Logout Success')
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: any }>())
