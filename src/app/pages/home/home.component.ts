import {Component} from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {HomeNavComponent} from "./home-nav/home-nav.component";
import {MatButton} from '@angular/material/button';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Store} from '@ngrx/store';
import * as authActions from '../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    HomeNavComponent,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isSlideBarVisible = false;

  constructor(private store: Store<{ auth: AuthState }>) {
  }

  onLinkActivated(): void {
    this.isSlideBarVisible = false;
  }

  login() {
    this.store.dispatch(authActions.login())
  }
}
