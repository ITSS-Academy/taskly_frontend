import { Component } from '@angular/core';
import {MaterialModule} from '../../../../shared/modules/material.module';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss'
})
export class ListTasksComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  todoInputVisible = false;
  doneInputVisible = false;
  newTask = '';
  newDoneTask = '';
  protected newTodoTask: any;

  drop(event: CdkDragDrop<string[]>) {
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

  addTask(listType: string) {
    if (listType === 'todo') {
      this.todoInputVisible = true;
      this.doneInputVisible = false;
    } else if (listType === 'done') {
      this.doneInputVisible = true;
      this.todoInputVisible = false;
    }
  }

  saveTask(listType: string) {
    if (listType === 'todo' && this.newTodoTask.trim()) {
      this.todo.push(this.newTodoTask);
      this.newTodoTask = '';
      this.todoInputVisible = false;
    } else if (listType === 'done' && this.newDoneTask.trim()) {
      this.done.push(this.newDoneTask);
      this.newDoneTask = '';
      this.doneInputVisible = false;
    }
  }

  cancelTask(listType: string) {
    if (listType === 'todo') {
      this.newTodoTask = '';
      this.todoInputVisible = false;
    } else if (listType === 'done') {
      this.newDoneTask = '';
      this.doneInputVisible = false;
    }
  }
}
