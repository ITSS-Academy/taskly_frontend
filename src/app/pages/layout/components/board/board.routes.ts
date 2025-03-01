import {KanbanComponent} from './components/kanban/kanban.component';
import {TableComponent} from './components/table/table.component';
import {Routes} from '@angular/router';
import {BoardComponent} from './board.component';

export const boardRoutes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {path: 'kanban/:id', component: KanbanComponent},
      {path: 'table/:id', component: TableComponent},
    ]
  },
];
