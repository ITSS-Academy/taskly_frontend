import { Component } from '@angular/core';
import {ListTasksComponent} from './components/list-tasks/list-tasks.component';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [ListTasksComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {

}
