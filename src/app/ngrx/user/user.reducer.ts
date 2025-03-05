import {UserState} from './user.state';
import {createReducer, on} from '@ngrx/store';
import * as userActions from './user.actions';

const initialState: UserState = {
  user: null,

  isGettingUser: false,
  isGettingUserSuccess: false,
  getUserError: '',

  searchUsers: [],
  isSearchingUsers: false,
  isSearchingUsersSuccess: false,
  searchUsersError: ''

}

export const userReducer = createReducer(
  initialState,
  on(userActions.getUser, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isGettingUser: true,
      isGettingUserSuccess: false,
      getUserError: ''
    };
  }),
  on(userActions.getUserSuccess, (state, {user, type}) => {
    console.log(type)
    return {
      ...state,
      user,
      isGettingUser: false,
      isGettingUserSuccess: true,
      getUserError: ''
    };
  }),
  on(userActions.getUserFailure, (state, {errorMessage, type}) => {
    console.log(type)
    return {
      ...state,
      isGettingUser: false,
      isGettingUserSuccess: false,
      getUserError: errorMessage
    };
  }),
  on(userActions.searchUsers, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isSearchingUsers: true,
      isSearchingUsersSuccess: false,
      searchUsersError: ''
    };
  }),
  on(userActions.searchUsersSuccess, (state, {users, type}) => {
    console.log(type)
    return {
      ...state,
      searchUsers: users,
      isSearchingUsers: false,
      isSearchingUsersSuccess: true,
      searchUsersError: ''
    };
  }),
  on(userActions.searchUsersFailure, (state, {errorMessage, type}) => {
    console.log(type)
    return {
      ...state,
      isSearchingUsers: false,
      isSearchingUsersSuccess: false,
      searchUsersError: errorMessage
    };
  }),
  on(userActions.clearSearchUsers, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      searchUsers: [],
      isSearchingUsers: false,
      isSearchingUsersSuccess: false,
      searchUsersError: ''
    };
  }),
  on(userActions.signOut, (state, {type}) => {
    return initialState
  })
);
