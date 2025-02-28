import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AllTaskComponent} from './components/all-task/all-task.component';
import {KanbanComponent} from './components/kanban/kanban.component';
import {LayoutComponent} from './layout.component';

export const LayoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'alltasks',
        component: AllTaskComponent
      },
      {
        path: 'kanban/:id',
        component: KanbanComponent
      },
    ]
  }
]
