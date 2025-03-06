import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {catchError, map, of, switchMap} from 'rxjs';
import * as userActions from './user.actions';

export const getUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.getUser),
      switchMap(() => userService.getUser().pipe(
        map(user => userActions.getUserSuccess({user: user as any})),
        catchError(errorMessage => of(userActions.getUserFailure({errorMessage})))
      ))
    );
  }, {functional: true}
);

export const searchUsers = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.searchUsers),
      switchMap(({email}) => userService.search(email).pipe(
        map((users: any) => userActions.searchUsersSuccess({users})),
        catchError(errorMessage => of(userActions.searchUsersFailure({errorMessage})))
      ))
    );
  }, {functional: true}
);
