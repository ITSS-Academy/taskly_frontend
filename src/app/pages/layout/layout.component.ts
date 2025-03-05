import {Component, OnDestroy} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {NotificationsService} from '../../services/notification/notifications.service';
import {Store} from '@ngrx/store';
import {UserState} from '../../ngrx/user/user.state';
import * as userActions from '../../ngrx/user/user.actions';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy {

  constructor(private notification: NotificationsService,
              private store: Store<{
                user: UserState
              }>) {
    this.store.dispatch(userActions.getUser());
  }

  ngOnDestroy() {
    this.store.dispatch(userActions.signOut());
  }

}
