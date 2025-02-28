import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {NotificationsComponent} from './components/notifications/notifications.component';
import {LoginComponent} from './pages/login/login.component';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {AuthState} from './ngrx/auth/auth.state';
import {Store} from '@ngrx/store';
import * as authActions from './ngrx/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NotificationsComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskly_frontend';

  constructor(private auth: Auth,
              private router: Router,
              private store: Store<{ auth: AuthState }>) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.router.navigate(['/home']);
        const token = await user.getIdToken();
        this.store.dispatch(authActions.storeAccessToken({accessToken: token}));
      } else {
        console.log('UserModel is logged out');
        this.router.navigate(['/login']);
      }
    })
  }
}
