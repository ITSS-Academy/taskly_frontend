import {Component, OnInit} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Observable, of, Subscription} from 'rxjs';
import {TaskComponent} from './components/list-tasks/components/task/task.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {ForDirective} from '../../../../../../shared/for.directive';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {BoardState} from '../../../../../../ngrx/board/board.state';
import {Store} from '@ngrx/store';
import * as boardActions from '../../../../../../ngrx/board/board.actions';
import {NavbarComponent} from '../../../../../../components/navbar/navbar.component';
import {BoardModel} from '../../../../../../models/board.model';

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
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  standalone: true,
  imports: [
    CdkDropList,
    TaskComponent,
    MatIcon,
    MatButton,
    CdkDrag,
    ForDirective,
    NgForOf,
    NavbarComponent,
    RouterOutlet
  ],
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<{ board: BoardState }>) {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.store.dispatch(boardActions.getBoard({boardId: id}));
    });
  }

  board$!: Observable<BoardModel | null>

  ngOnInit(): void {

    this.board$ = this.store.select('board', 'board')


    // Sample data - replace with your actual data service
    this.todo = [
      {
        id: '1',
        title: 'Lorem Ipsum is s...',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        assignees: ['user1', 'user2'],
        date: new Date('2022-11-12'),
        progress: 33,
        totalSubtasks: 3,
        completedSubtasks: 2
      },
      {
        id: '2',
        title: 'Lorem Ipsum is s...',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        assignees: ['user1', 'user2'],
        date: new Date('2022-11-12'),
        progress: 66,
        totalSubtasks: 3,
        completedSubtasks: 2
      }
    ];

    this.inProgress = [
      {
        id: '3',
        title: 'Lorem Ipsum is s...',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        assignees: ['user1', 'user2'],
        date: new Date('2022-11-12'),
        progress: 66,
        totalSubtasks: 3,
        completedSubtasks: 2
      }
    ];

    this.done = [
      {
        id: '4',
        title: 'Lorem Ipsum is s...',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        assignees: ['user1', 'user2'],
        date: new Date('2022-11-12'),
        progress: 100,
        totalSubtasks: 3,
        completedSubtasks: 3
      },
      {
        id: '5',
        title: 'Lorem Ipsum is s...',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        assignees: ['user1', 'user2'],
        date: new Date('2022-11-12'),
        progress: 100,
        totalSubtasks: 3,
        completedSubtasks: 3
      },
      {
        id: '6',
        title: 'Lorem Ipsum is s...',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        assignees: ['user1', 'user2'],
        date: new Date('2022-11-12'),
        progress: 100,
        totalSubtasks: 3,
        completedSubtasks: 3
      }
    ];
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

      // Update task status based on the new container
      const movedTask = event.container.data[event.currentIndex];
      if (event.container.id === 'todo-list') {
        // Update progress logic for todo items
      } else if (event.container.id === 'in-progress-list') {
        // Update progress logic for in-progress items
      } else if (event.container.id === 'done-list') {
        // Update progress logic for done items
        movedTask.progress = 100;
        movedTask.completedSubtasks = movedTask.totalSubtasks;
      }
    }
  }

  addTask(listType: string) {
    // Implement logic to add a new task to the specified list
    console.log('Adding task to', listType);
  }

  addNewList() {
    // Implement logic to add a new list column
    console.log('Adding new list');
  }

  protected readonly of = of;
}
