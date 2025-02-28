import {Component} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Store} from '@ngrx/store';
import * as authActions from '../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private store: Store<{ auth: AuthState }>) {
  }

  login() {
    this.store.dispatch(authActions.login())
  }
}
