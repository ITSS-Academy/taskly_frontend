import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {MaterialModule} from '../../shared/modules/material.module';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {logout} from '../../ngrx/auth/auth.actions';
import {UserState} from '../../ngrx/user/user.state';
import {Subscription} from 'rxjs';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss'
})
export class LogoutButtonComponent implements OnInit, OnDestroy {
  constructor(private store: Store<{
    auth: AuthState;
    user: UserState
  }>) {
  }

  subscription: Subscription[] = [];
  user!: UserModel

  ngOnInit() {
    this.subscription.push(
      this.store.select('user', 'user').subscribe((user) => {
        if (user) {
          this.user = user;

        }
      })
    )
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  logout() {
    this.store.dispatch(logout());
  }
}
