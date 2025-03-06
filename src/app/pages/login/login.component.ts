import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import * as authActions from '../../ngrx/auth/auth.actions';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy, OnInit {
  subcriptions: Subscription[] = [];

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subcriptions.push(
      this.store
        .select('auth', 'isLoginSuccess')
        .subscribe((isLoginSuccess) => {
          if (isLoginSuccess) {
            this.router.navigate(['/home']);
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

  login() {
    this.store.dispatch(authActions.login());
  }
}
