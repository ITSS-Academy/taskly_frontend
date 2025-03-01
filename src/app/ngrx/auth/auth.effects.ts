import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import * as authActions from './auth.actions';
import {catchError, map, of, switchMap} from 'rxjs';

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(() => {
          return authService.signInWithGoogle().pipe(
            switchMap((accessToken) => {
                return authService.login(accessToken).pipe(
                  map(() => authActions.loginSuccess({accessToken: accessToken})),
                  catchError((error) => {
                    return of(authActions.loginFailure({error: error.message}));
                  })
                )
              }
            ),
            catchError((error) => {
              return of(authActions.loginFailure({error: error.message}));
            })
          );
        }
      )
    )
  }, {
    functional: true
  }
)

export const logout$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      switchMap(() => {
          return authService.logout().pipe(
            map(() => authActions.logoutSuccess()),
            catchError((error) => {
              return of(authActions.logoutFailure({error: error.message}));
            })
          );
        }
      )
    )
  }, {
    functional: true
  }
)
