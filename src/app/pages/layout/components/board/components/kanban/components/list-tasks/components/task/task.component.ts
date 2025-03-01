import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, NgIf} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {of} from 'rxjs';
import {MatIconButton} from '@angular/material/button';
import {ForDirective} from '../../../../../../../../../../shared/for.directive';

interface Task {
  id: string;
  title: string;
  description: string;
  assignees: string[];
  date: Date;
  progress: number;
  totalSubtasks: number;
  completedSubtasks: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [
    MatIcon,
    DatePipe,
    MatCheckbox,
    MatIconButton,
    NgIf,
    ForDirective
  ],
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;

  closeTask() {
    // Implement logic to remove/archive task
    console.log('Closing task:', this.task.id);
  }

  getProgressColor() {
    if (this.task.progress < 34) {
      return '#FFA726'; // Orange for low progress
    } else if (this.task.progress < 67) {
      return '#26A69A'; // Teal for medium progress
    } else {
      return '#66BB6A'; // Green for high progress
    }
  }

  protected readonly of = of;
}
