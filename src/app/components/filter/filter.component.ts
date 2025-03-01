import {Component, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemIcon, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MaterialModule} from '../../shared/modules/material.module';

export interface Assignee {
  imgUrl: string;
  name: string;
  completed: boolean;
}

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Assignee[];
}

export interface Tags {
  name: string;
  completed: boolean;
  subtasks?: Tags[];
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  readonly task = signal<Task>({
    name: 'Parent task',
    completed: false,
    subtasks: [
      {
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s',
        name: 'Child task 1',
        completed: false
      },
      {
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s',
        name: 'Child task 2',
        completed: false
      },
      {
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s',
        name: 'Child task 3',
        completed: false
      },
    ],
  });

  readonly tags = signal<Tags>({
    name: 'Parent task',
    completed: false,
    subtasks: [
      {name: 'Child task 1', completed: false},
      {name: 'Child task 2', completed: false},
      {name: 'Child task 3', completed: false},
    ],
  });

  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every(t => t.completed) ?? true;
      }
      return {...task};
    });
  }

  updateTags(completed: boolean, index?: number) {
    this.tags.update(tags => {
      if (index === undefined) {
        tags.completed = completed;
        tags.subtasks?.forEach(t => (t.completed = completed));
      } else {
        tags.subtasks![index].completed = completed;
        tags.completed = tags.subtasks?.every(t => t.completed) ?? true;
      }
      return {...tags};
    });
  }
}
