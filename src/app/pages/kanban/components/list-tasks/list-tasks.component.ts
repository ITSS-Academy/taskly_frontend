import { Component, OnInit, Input } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskComponent} from './task/task.component';
import {MatIcon} from '@angular/material/icon';
import {of} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {ForDirective} from '../../../../shared/for.directive';
import {NgForOf} from '@angular/common';

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
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  standalone: true,
  imports: [
    CdkDropList,
    TaskComponent,
    MatIcon,
    MatButton,
    ForDirective,
    CdkDrag,
    NgForOf
  ],
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Input() listTitle: string = '';
  @Input() listId: string = '';
  @Input() connectedTo: string[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addTask() {
    // Implement logic to add a new task
    console.log('Adding task to', this.listTitle);
  }

  protected readonly of = of;
}
