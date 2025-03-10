import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  combineLatest,
  distinctUntilKeyChanged,
  filter,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { TaskComponent } from './components/list-tasks/components/task/task.component';

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
import { GatewayService } from '../../../../../../services/gateway/gateway.service';
import { CardState } from '../../../../../../ngrx/card/card.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareSnackbarComponent } from '../../../../../../components/share-snackbar/share-snackbar.component';
import { ChecklistItemState } from '../../../../../../ngrx/checklistItem/checklistItem.state';

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
    CdkDragHandle,
    CdkDragPlaceholder,
  ],
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnDestroy {
  board$!: Observable<BoardModel | null>;
  lists: (ListModel & { isInEditMode?: boolean })[] = [];
  boardId!: string;
  isAddingList = false;

  cardName = new FormControl('', [Validators.required]);
  listName = new FormControl('', [Validators.required]);

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      board: BoardState;
      list: ListState;
      card: CardState;
      checklistItem: ChecklistItemState;
    }>,
    private gateway: GatewayService,
  ) {}

  private _snackBar = inject(MatSnackBar);
  isUpdatingCard$!: Observable<boolean>;

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('list', 'lists').subscribe((lists) => {
        console.log('lists in kanban');
        console.log(lists);
        this.lists = lists;
      }),
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.boardId = board.id!;
        }
      }),
    );
    this.board$ = this.store.select('board', 'board');
    this.isUpdatingCard$ = this.store.select('list', 'isUpdatingCard');
  }

  addTask(listId: string) {
    if (this.isAddingList) {
      this.isAddingList = !this.isAddingList;
      this.listName.reset();
    }
    this.list.isInEditMode = true;
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
    if (this.listName.valid) {
      this.store.dispatch(
        listActions.addNewList({
          listName: this.listName.value!,
          boardId: this.boardId,
        }),
      );
      this.listName.reset();
      this.isAddingList = false;
    } else {
      this._snackBar.openFromComponent(ShareSnackbarComponent, {
        data: 'Please fill in the form',
      });
    }
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

  onCardDrop(event: CdkDragDrop<any[], any>) {
    //get list Index
    const previousIndex = parseInt(event.previousContainer.id);
    const currentIndex = parseInt(event.container.id);
    this.store.dispatch(
      listActions.updateCard({
        cardId: this.lists[previousIndex].cards![event.previousIndex].id!,
        listId: this.lists[currentIndex]!.id!,
        cardPosition: Number(event.currentIndex),
        previousListId: this.lists[previousIndex].id!,
      }),
    );

    console.log(
      this.lists[previousIndex].cards![event.previousIndex].id,
      this.lists[currentIndex]!.id!,
      Number(event.currentIndex),
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
      console.log(event.container!.data);
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

  createNewTask(listId: string) {
    if (!this.cardName.valid) {
      this._snackBar.openFromComponent(ShareSnackbarComponent, {
        data: 'Please fill in the form',
      });
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
    this.list.isInEditMode = false;
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

  ngOnDestroy() {
    console.log('destroy');
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  cancelAddList() {
    this.listName.reset();
    this.isAddingList = false;
  }

  onBtnAddList() {
    if (this.list.isInEditMode) {
      this.lists = this.lists.map((list) => {
        return { ...list, isInEditMode: false };
      });
      this.cardName.reset();
    }
    this.isAddingList = true;
  }

  removeList(listId: string) {
    this.store.dispatch(listActions.deleteList({ listId }));
  }

  @ViewChild('columnInput') columnInput!: ElementRef;
  @ViewChild('taskInput') taskInput!: ElementRef;

  list = { isInEditMode: false }; // Simulated list object, replace with actual logic

  // ngAfterViewChecked() {
  //   if (this.isAddingList && this.columnInput) {
  //     setTimeout(() => this.columnInput.nativeElement.focus(), 0);
  //   }
  //
  //   if (this.list.isInEditMode && this.taskInput) {
  //     setTimeout(() => this.taskInput.nativeElement.focus(), 0);
  //   }
  // }
  onDragStarted() {
    console.log('drag started');
    this.store.dispatch(listActions.startUpdateCard());
  }
}
