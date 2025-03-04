import {Component} from '@angular/core';
import {SidebarComponent} from "../../../../components/sidebar/sidebar.component";
import {HomeNavComponent} from "./components/home-nav/home-nav.component";
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {LoginComponent} from '../../../login/login.component';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {Store} from '@ngrx/store';
import * as authActions from '../../../../ngrx/auth/auth.actions';
import {logout} from '../../../../ngrx/auth/auth.actions';
import {BackgroundColorService} from '../../../../services/background-color/background-color.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    HomeNavComponent,
    MatButton,
    MatIcon,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isSlideBarVisible = false;

  constructor(private backgroundService: BackgroundColorService,
              private store: Store<{ auth: AuthState }>) {
    this.backgroundService.setNavbarTextColor('rgb(0, 0, 0)');
    this.backgroundService.setSidebarColor('rgb(245, 255, 248)');
  }

  onLinkActivated(): void {
    this.isSlideBarVisible = false;
  }
}
