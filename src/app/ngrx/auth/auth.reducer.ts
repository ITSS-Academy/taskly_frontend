import {AuthState} from './auth.state';
import {createReducer, on} from '@ngrx/store';
import * as authActions from './auth.actions';

const initialState: AuthState = {
  idToken: '',
  isLoginLoading: false,
  isLoginSuccess: false,
  loginErrorMessage: '',
  isLogoutLoading: false,
  isLogoutSuccess: false,
  logoutErrorMessage: ''
}

export const authReducer = createReducer(initialState,
  on(authActions.login, (state) => {
    return {
      ...state,
      isLoginLoading: true,
      isLoginSuccess: false,
      loginErrorMessage: ''
    }
  }),
  on(authActions.loginSuccess, (state, {accessToken}) => {
    console.log(accessToken)
    return {
      ...state,
      idToken: accessToken,
      isLoginLoading: false,
      isLoginSuccess: true
    }
  }),
  on(authActions.loginFailure, (state, {error}) => {
    console.log(error)
    return {
      ...state,
      isLoginLoading: false,
      isLoginSuccess: false,
      loginErrorMessage: error
    }
  }),
  on(authActions.logout, (state) => {
    return {
      ...state,
      isLogoutLoading: true,
      isLogoutSuccess: false,
      logoutErrorMessage: ''
    }
  }),
  on(authActions.logoutSuccess, (state) => {
    return {
      ...state,
      idToken: '',
      isLogoutLoading: false,
      isLogoutSuccess: true
    }
  }),
  on(authActions.logoutFailure, (state, {error}) => {
    return {
      ...state,
      isLogoutLoading: false,
      isLogoutSuccess: false,
      logoutErrorMessage: error
    }
  }),
  on(authActions.storeAccessToken, (state, {accessToken, type}) => {
    console.log(type)
    return {
      ...state,
      idToken: accessToken
    }
  })
);
