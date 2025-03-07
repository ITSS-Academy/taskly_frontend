import {
  AfterViewChecked,
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
} from 'rxjs';
import {TaskComponent} from './components/list-tasks/components/task/task.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {ForDirective} from '../../../../../../shared/for.directive';
import {AsyncPipe, NgClass, NgForOf} from '@angular/common';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {BoardState} from '../../../../../../ngrx/board/board.state';
import {Store} from '@ngrx/store';
import * as boardActions from '../../../../../../ngrx/board/board.actions';
import {NavbarComponent} from '../../../../../../components/navbar/navbar.component';
import {BoardModel} from '../../../../../../models/board.model';
import {ListModel} from '../../../../../../models/list.model';
import * as listActions from '../../../../../../ngrx/list/list.actions';
import {ListState} from '../../../../../../ngrx/list/list.state';
import {MaterialModule} from '../../../../../../shared/modules/material.module';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {GatewayService} from '../../../../../../services/gateway/gateway.service';
import {CardState} from '../../../../../../ngrx/card/card.state';

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
  ],
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnDestroy, AfterViewChecked {
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
      card: CardState
    }>,
    private gateway: GatewayService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const newBoardId = params['id'];
      if (this.boardId) {
        this.gateway.leaveBoard(this.boardId);
      }
      this.boardId = newBoardId;

      this.subscriptions.forEach((sub) => sub.unsubscribe());
      this.subscriptions = [];
      this.store.dispatch(listActions.clearListStore());

      this.store.dispatch(boardActions.getBoard({boardId: this.boardId}));
      this.store.dispatch(listActions.getLists({boardId: this.boardId}));
      this.subscriptions.push(
        this.store
          .select('list', 'isGettingListsSuccess')
          .subscribe((isGettingListsSuccess) => {
            if (isGettingListsSuccess) {
              this.subscriptions.push(
                this.store
                  .select('board', 'board')
                  .pipe(
                    filter((board) => !!board),
                    distinctUntilKeyChanged('id'),
                    switchMap((board) =>
                      this.store.select('list', 'lists').pipe(
                        map((lists) => ({
                          board,
                          lists:
                            lists?.filter(
                              (list) => list.boardId === board.id,
                            ) ?? [],
                        })),
                        take(1),
                      ),
                    ),
                  )
                  .subscribe(({board, lists}) => {
                    if (lists.length > 0 && board.listsCount) {
                      console.log(
                        '🚀 Joining board:',
                        board.id,
                        'with lists:',
                        lists,
                      );
                      this.gateway.joinBoard(board, lists);
                    } else if (!board.listsCount) {
                      console.log(
                        '🚀 Joining board:',
                        board.id,
                        'with lists:',
                        [],
                      );
                      this.gateway.joinBoard(board, []);
                    }
                  }),
              );
            }
          }),

        this.store.select('list', 'lists').subscribe((lists) => {
          console.log(lists);
          this.lists = lists;
        }),
        this.store
          .select('list', 'isAddingListSuccess')
          .subscribe((isAddingListSuccess) => {
            if (isAddingListSuccess) {
              this.gateway.onListChange(this.boardId, this.lists);
            }
          }),

        this.store.select('card', 'isUpdateTaskSuccess').subscribe((isSuccess) => {
            if (isSuccess) {
              this.gateway.onListChange(this.boardId, this.lists);
            }
          }
        ),
        this.store
          .select('list', 'isDeletingListSuccess')
          .subscribe((isDeletingListSuccess) => {
            if (isDeletingListSuccess) {
              this.gateway.onListChange(this.boardId, this.lists);
            }
          }),
        this.store
          .select('list', 'isDeletingCardSuccess')
          .subscribe((isDeletingCardSuccess) => {
            if (isDeletingCardSuccess) {
              this.gateway.onListChange(this.boardId, this.lists);
            }
          }),
        this.store
          .select('list', 'isUpdatingListsSuccess')
          .subscribe((isUpdatingListsSuccess) => {
            if (isUpdatingListsSuccess) {
              this.gateway.onListChange(this.boardId, this.lists);
            }
          }),
        this.store
          .select('list', 'isAddingCardSuccess')
          .subscribe((isAddingCardSuccess) => {
            if (isAddingCardSuccess) {
              this.gateway.onListChange(this.boardId, this.lists);
            }
          }),
        this.store
          .select('list', 'isUpdatingCardSuccess')
          .subscribe((isUpdatingCardSuccess) => {
            if (isUpdatingCardSuccess) {
              this.gateway.onListChange(this.boardId, this.lists);
            }
          }),

        this.gateway.listenListChange().subscribe((lists: ListModel[]) => {
          // this.lists = lists;
          this.store.dispatch(listActions.storeNewLists({lists}));
        }),
      );
    });
    this.board$ = this.store.select('board', 'board');
  }

  addTask(listId: string) {
    this.list.isInEditMode = true;
    // find in lists, then switch isInEditMode to true
    this.lists = this.lists.map((list) => {
      if (list.id === listId) {
        return {...list, isInEditMode: true};
      }
      if (list.isInEditMode) {
        this.cardName.reset();
        return {...list, isInEditMode: false};
      }
      return list;
    });
  }

  addNewList() {
    this.store.dispatch(
      listActions.addNewList({
        listName: this.listName.value!,
        boardId: this.boardId,
      }),
    );
    this.listName.reset();
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
    console.log(event);
    console.log('888888888888888888888888888888888888888888888888')

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
        cardId: this.lists[previousIndex].cards![event.previousIndex].id!,
        listId: this.lists[currentIndex]!.id!,
        cardPosition: Number(event.currentIndex),
      }),
    );

    if (event.previousContainer === event.container) {
      if (this.lists && this.lists[previousIndex].cards) {
        console.log(this.lists[previousIndex]);
        const updatedColumns = [
          ...this.lists[previousIndex].cards.map((card: any) => ({...card})),
        ];
        moveItemInArray(
          updatedColumns,
          event.previousIndex,
          event.currentIndex,
        );
        this.lists = this.lists.map((col, index) => {
          if (index === previousIndex) {
            return {...col, cards: [...updatedColumns]};
          }
          return col;
        });
      }
    } else {
      const previousContainer = [
        ...event.previousContainer.data.map((item: any) => ({...item})),
      ];
      console.log(event.container!.data);
      const container = [
        ...event.container!.data!.map((item: any) => ({...item})),
      ];
      transferArrayItem(
        previousContainer,
        container,
        event.previousIndex,
        event.currentIndex,
      );

      this.lists = this.lists.map((col, index) => {
        if (index === previousIndex) {
          return {...col, cards: [...previousContainer]};
        }
        if (index === currentIndex) {
          return {...col, cards: [...container]};
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
    if (this.cardName.errors) {
      return;
    }
    this.store.dispatch(
      listActions.addCard({card: this.cardName.value!, listId}),
    );
    this.cardName.reset();
    this.lists = this.lists.map((list) => {
      if (list.id === listId) {
        return {...list, isInEditMode: false};
      }
      return list;
    });
  }

  cancelEdit(listId: string) {
    this.list.isInEditMode = false;
    this.lists = this.lists.map((list) => {
      if (list.id === listId) {
        return {...list, isInEditMode: false};
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
    this.store.dispatch(listActions.clearListStore());
  }

  cancelAddList() {
    this.isAddingList = false;
  }

  onBtnAddList() {
    this.isAddingList = true;
  }

  removeList(listId: string) {
    this.store.dispatch(listActions.deleteList({listId}));
  }

  @ViewChild('columnInput') columnInput!: ElementRef;
  @ViewChild('taskInput') taskInput!: ElementRef;

  list = {isInEditMode: false}; // Simulated list object, replace with actual logic

  ngAfterViewChecked() {
    if (this.isAddingList && this.columnInput) {
      setTimeout(() => this.columnInput.nativeElement.focus(), 0);
    }

    if (this.list.isInEditMode && this.taskInput) {
      setTimeout(() => this.taskInput.nativeElement.focus(), 0);
    }
  }
}
