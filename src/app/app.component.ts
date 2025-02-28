import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {NotificationsComponent} from './components/notifications/notifications.component';
import {CreateBoardComponent} from './components/create-board/create-board.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NotificationsComponent, CreateBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskly_frontend';
}
