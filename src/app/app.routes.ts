import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AllTaskComponent} from './pages/all-task/all-task.component';
import {KanbanComponent} from './pages/kanban/kanban.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'alltasks',
    component: AllTaskComponent
  },
  {
    path: 'kanban',
    component: KanbanComponent
  }
];
