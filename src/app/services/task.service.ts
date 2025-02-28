import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private todoKey = 'todoList';
  private doneKey = 'doneList';

  constructor() { }

  getTasks(): { todo: string[]; done: string[] } {
    const todo = JSON.parse(localStorage.getItem(this.todoKey) || '[]');
    const done = JSON.parse(localStorage.getItem(this.doneKey) || '[]');
    return { todo, done };
  }

  addTask(status: 'todo' | 'done', task: string) {
    if (!task.trim()) return;

    const tasks = this.getTasks();
    tasks[status].push(task);

    this.saveTasks(tasks);
  }

  updateTasks(todo: string[], done: string[]) {
    this.saveTasks({ todo, done });
  }

  private saveTasks(tasks: { todo: string[]; done: string[] }) {
    localStorage.setItem(this.todoKey, JSON.stringify(tasks.todo));
    localStorage.setItem(this.doneKey, JSON.stringify(tasks.done));
  }
}
