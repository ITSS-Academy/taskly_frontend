import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.navigate(['/login']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
