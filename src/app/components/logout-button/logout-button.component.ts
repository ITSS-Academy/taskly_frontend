import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {MaterialModule} from '../../shared/modules/material.module';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {logout} from '../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss'
})
export class LogoutButtonComponent {
  constructor(private store: Store<{ auth: AuthState }>) {
  }

  logout() {
    this.store.dispatch(logout());
  }
}
