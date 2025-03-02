import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Observable, of, Subscription } from 'rxjs';
import { TaskComponent } from './components/list-tasks/components/task/task.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { ForDirective } from '../../../../../../shared/for.directive';
import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BoardState } from '../../../../../../ngrx/board/board.state';
import { Store } from '@ngrx/store';
import * as boardActions from '../../../../../../ngrx/board/board.actions';
import { NavbarComponent } from '../../../../../../components/navbar/navbar.component';
import { BoardModel } from '../../../../../../models/board.model';
import { ListModel } from '../../../../../../models/list.model';
import * as listActions from '../../../../../../ngrx/list/list.actions';
import { ListState } from '../../../../../../ngrx/list/list.state';
import { MaterialModule } from '../../../../../../shared/modules/material.module';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

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
    RouterOutlet,
    AsyncPipe,
    CdkDropListGroup,
    NgClass,
    MaterialModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnDestroy {
  board$!: Observable<BoardModel | null>;
  lists: (ListModel & { isInEditMode?: boolean })[] = [];
  boardId!: string;

  cardName = new FormControl('', [Validators.required]);

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      board: BoardState;
      list: ListState;
    }>,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.boardId = params['id'];
      this.store.dispatch(boardActions.getBoard({ boardId: this.boardId }));
      this.store.dispatch(listActions.getLists({ boardId: this.boardId }));
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('list', 'lists').subscribe((lists) => {
        console.log(lists);
        this.lists = lists;
      }),
    );

    this.board$ = this.store.select('board', 'board');
  }

  // drop(event: CdkDragDrop<Task[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //
  //     // Update task status based on the new container
  //     const movedTask = event.container.data[event.currentIndex];
  //     if (event.container.id === 'todo-list') {
  //       // Update progress logic for todo items
  //     } else if (event.container.id === 'in-progress-list') {
  //       // Update progress logic for in-progress items
  //     } else if (event.container.id === 'done-list') {
  //       // Update progress logic for done items
  //       movedTask.progress = 100;
  //       movedTask.completedSubtasks = movedTask.totalSubtasks;
  //     }
  //   }
  // }

  addTask(listId: string) {
    // find in lists, then switch isInEditMode to true
    this.lists = this.lists.map((list) => {
      if (list.id === listId) {
        return { ...list, isInEditMode: true };
      }
      if (list.isInEditMode) {
        this.cardName.reset();
        return { ...list, isInEditMode: false };
      }
      return list;
    });
  }

  addNewList() {
    // Implement logic to add a new list column
    console.log('Adding new list');
  }

  onColumnDrop($event: CdkDragDrop<any>) {
    console.log($event);
    if (
      $event.previousContainer === $event.container &&
      Array.isArray(this.lists)
    ) {
      const updatedColumns = this.lists.map((col) => ({
        ...col,
        cards: col.cards ? [...col.cards] : [],
      }));
      moveItemInArray(
        updatedColumns,
        $event.previousIndex,
        $event.currentIndex,
      );
      this.lists = updatedColumns;
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex,
      );
    }
    console.log(this.lists);
    this.store.dispatch(
      listActions.updatePosition({
        list: this.lists,
        boardId: this.boardId,
      }),
    );
  }

  protected readonly of = of;

  onCardDrop(event: CdkDragDrop<any[] | null, any>) {
    console.log(event);

    //get list Index
    const previousIndex = parseInt(event.previousContainer.id);
    const currentIndex = parseInt(event.container.id);

    console.log(
      this.lists[previousIndex].cards![event.previousIndex].id,
      this.lists[currentIndex]!.id!,
      Number(event.currentIndex),
    );

    this.store.dispatch(
      listActions.updateCard({
        cardId: this.lists[previousIndex].cards![event.previousIndex].id,
        listId: this.lists[currentIndex]!.id!,
        cardPosition: Number(event.currentIndex),
      }),
    );

    if (event.previousContainer === event.container) {
      if (this.lists && this.lists[previousIndex].cards) {
        console.log(this.lists[previousIndex]);
        const updatedColumns = [
          ...this.lists[previousIndex].cards.map((card: any) => ({ ...card })),
        ];
        moveItemInArray(
          updatedColumns,
          event.previousIndex,
          event.currentIndex,
        );
        this.lists = this.lists.map((col, index) => {
          if (index === previousIndex) {
            return { ...col, cards: [...updatedColumns] };
          }
          return col;
        });
      }
    } else {
      const previousContainer = [
        ...event.previousContainer.data.map((item: any) => ({ ...item })),
      ];
      const container = [
        ...event.container!.data!.map((item: any) => ({ ...item })),
      ];
      transferArrayItem(
        previousContainer,
        container,
        event.previousIndex,
        event.currentIndex,
      );

      this.lists = this.lists.map((col, index) => {
        if (index === previousIndex) {
          return { ...col, cards: [...previousContainer] };
        }
        if (index === currentIndex) {
          return { ...col, cards: [...container] };
        }
        return col;
      });
    }

    console.log(this.lists[previousIndex]);
    console.log(this.lists[currentIndex]);
  }

  indexToString(index: number): string {
    return index.toString();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  createNewTask(listId: string) {
    if (this.cardName.errors) {
      return;
    }
    this.store.dispatch(
      listActions.addCard({ card: this.cardName.value!, listId }),
    );
    this.cardName.reset();
    this.lists = this.lists.map((list) => {
      if (list.id === listId) {
        return { ...list, isInEditMode: false };
      }
      return list;
    });
  }

  cancelEdit(listId: string) {
    this.lists = this.lists.map((list) => {
      if (list.id === listId) {
        return { ...list, isInEditMode: false };
      }
      return list;
    });
  }

  onEnterPress(event: any, listId: string) {
    if (event.keyCode === 13) {
      this.createNewTask(listId);
    }
  }
}
