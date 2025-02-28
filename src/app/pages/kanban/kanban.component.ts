import {Component} from '@angular/core';
import {ListTasksComponent} from './components/list-tasks/list-tasks.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [ListTasksComponent, NavbarComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {

}
