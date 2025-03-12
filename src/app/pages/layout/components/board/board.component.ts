import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { BackgroundColorService } from '../../../../services/background-color/background-color.service';
import { AsyncPipe, JsonPipe, NgStyle } from '@angular/common';
import { BoardState } from '../../../../ngrx/board/board.state';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  distinctUntilKeyChanged,
  EMPTY,
  filter,
  map,
  merge,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { BoardModel } from '../../../../models/board.model';
import { BackgroundPipe } from '../../../../shared/pipes/background.pipe';
import { GatewayService } from '../../../../services/gateway/gateway.service';
import { ListModel } from '../../../../models/list.model';
import { ListState } from '../../../../ngrx/list/list.state';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import * as boardActions from '../../../../ngrx/board/board.actions';
import * as listActions from '../../../../ngrx/list/list.actions';
import { CardState } from '../../../../ngrx/card/card.state';
import { ChecklistItemState } from '../../../../ngrx/checklistItem/checklistItem.state';
import { CommentState } from '../../../../ngrx/comment/comment.state';
import { LabelState } from '../../../../ngrx/label/label.state';
import * as commentActions from '../../../../ngrx/comment/comment.actions';
import * as checklistItemActions from '../../../../ngrx/checklistItem/checklistItem.actions';
import * as cardActions from '../../../../ngrx/card/card.actions';
import * as labelActions from '../../../../ngrx/label/label.actions';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    NgStyle,
    AsyncPipe,
    BackgroundPipe,
    JsonPipe,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit, OnDestroy {
  backgroundImage: string | null =
    'https://images.unsplash.com/photo-1542435503-956c469947f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVza3RvcHxlbnwwfHwwfHx8MA%3D%3D';

  constructor(
    private backgroundService: BackgroundColorService,
    private gateway: GatewayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{
      board: BoardState;
      list: ListState;
      card: CardState;
      checklistItem: ChecklistItemState;
      comment: CommentState;
      label: LabelState;
    }>,
  ) {
    this.board$ = this.store.select('board', 'board');
  }

  subscriptions: Subscription[] = [];
  board$!: Observable<BoardModel | null>;
  routeSubscription!: Subscription;
  boardId!: string;
  lists: ListModel[] = [];
  backgroundId!: string;

  ngOnInit(): void {
    console.log('board component oninit');
    console.log(this.activatedRoute.firstChild);

    this.routeSubscription = merge(
      of(this.activatedRoute.firstChild?.snapshot.params['id']), // Lấy id khi component khởi tạo
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute.firstChild?.snapshot.params['id']), // Lấy id khi route thay đổi
      ),
    )
      .pipe(filter((id): id is string => !!id)) // Lọc bỏ giá trị null/undefined
      .subscribe((id) => {
        console.log('layout oninit ', id);
        const newBoardId = id;
        if (this.boardId) {
          this.gateway.disconnect();
        }
        this.boardId = newBoardId;
        console.log('🚀 Board ID:', this.boardId);
        this.gateway.connect();

        console.log('unsubscribe all');
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        this.subscriptions = [];
        this.store.dispatch(listActions.clearListStore());
        // this.store.dispatch(boardActions.clearBoardState());
        this.store.dispatch(cardActions.clearCardState());
        this.store.dispatch(commentActions.clearCommentState());
        this.store.dispatch(checklistItemActions.clearChecklistItemState());
        this.store.dispatch(labelActions.clearLabelState());

        this.store.dispatch(boardActions.getBoard({ boardId: this.boardId }));
        this.store.dispatch(listActions.getLists({ boardId: this.boardId }));
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
                    .subscribe(({ board, lists }) => {
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
            this.lists = lists;
          }),
          this.store.select('board', 'board').subscribe((board) => {
            if (board) {
              this.backgroundId = board.backgroundId!;

              if (
                board.background &&
                typeof board.background === 'object' &&
                'fileLocation' in board.background
              ) {
                this.extractPrimaryColor(
                  board.background.fileLocation as string,
                );
                this.backgroundImage = board.background.fileLocation as string;
              }
            }
          }),
          this.backgroundService.backgroundImage$.subscribe((imageUrl) => {
            this.backgroundImage = imageUrl;
          }),

          this.store
            .select('list', 'isAddingListSuccess')
            .subscribe((isAddingListSuccess) => {
              if (isAddingListSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),

          this.store
            .select('card', 'isUpdateTaskSuccess')
            .subscribe((isSuccess) => {
              if (isSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),
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
            .pipe(
              filter((isUpdating) => isUpdating),
              tap(() => {
                this.gateway.onListChange(this.boardId, this.lists);
                this.store.dispatch(listActions.resetUpdatingCardSuccess());
              }),
            )
            .subscribe(),
          this.store
            .select('label', 'isUpdateLabelSuccess')
            .subscribe((isAddLabelToTaskSuccess) => {
              if (isAddLabelToTaskSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),
          this.store
            .select('checklistItem', 'isDeleteChecklistItemSuccess')
            .subscribe((isDeleteChecklistItemSuccess) => {
              if (isDeleteChecklistItemSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),
          this.store
            .select('checklistItem', 'isAddChecklistItemSuccess')
            .subscribe((isAddChecklistItemSuccess) => {
              if (isAddChecklistItemSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),
          this.store
            .select('checklistItem', 'isToggleChecklistItemSuccess')
            .subscribe((isSuccess) => {
              if (isSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),
          this.store
            .select('card', 'isAddNewMemberSuccess')
            .subscribe((isAddNewMemberSuccess) => {
              if (isAddNewMemberSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),
          this.store
            .select('card', 'isRemoveMemberSuccess')
            .subscribe((isRemoveMemberSuccess) => {
              if (isRemoveMemberSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),
          this.store
            .select('comment', 'isCreateCommentSuccess')
            .subscribe((isCreatingCommentSuccess) => {
              if (isCreatingCommentSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),
          this.store
            .select('comment', 'isDeleteCommentSuccess')
            .subscribe((isDeletingCommentSuccess) => {
              if (isDeletingCommentSuccess) {
                this.gateway.onListChange(this.boardId, this.lists);
              }
            }),
          this.store
            .select('board', 'isChangeBoardBackgroundSuccess')
            .subscribe((isChangeBoardBackgroundSuccess) => {
              if (isChangeBoardBackgroundSuccess) {
                this.backgroundService.setBackgroundImage(
                  this.backgroundImage!,
                );
                this.gateway.onBackgroundChange(this.boardId, {
                  fileLocation: this.backgroundImage!,
                  id: this.backgroundId,
                });
              }
            }),
          this.gateway.listenListChange().subscribe((lists: ListModel[]) => {
            // this.lists = lists;
            this.store.dispatch(listActions.storeNewLists({ lists }));
          }),
          this.gateway.listenBackgroundChange().subscribe((background) => {
            this.backgroundImage = background.background.fileLocation;
            this.backgroundService.setBackgroundImage(
              background.background.fileLocation,
            );
            this.store.dispatch(
              boardActions.listenBackgroundChange({
                boardId: background.boardId,
                background: background.background,
              }),
            );
          }),
        );
      });
  }

  handleOnBoardChange(boardId: string) {}

  extractPrimaryColor(imageUrl: string): void {
    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = 'Anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < imageData.length; i += 4 * 100) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      const primaryColor = `rgb(${r}, ${g}, ${b})`;
      console.log('Extracted Sidebar Color:', primaryColor);

      this.backgroundService.setLogo(primaryColor);
      this.backgroundService.setSidebarColor(primaryColor);
      this.backgroundService.setNavbarTextColor(primaryColor);
    };
  }

  ngOnDestroy() {
    console.log('unsubscribing routeSub');
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(boardActions.clearBoardBackground());
    this.store.dispatch(listActions.clearListStore());
    this.store.dispatch(cardActions.clearCardState());
    this.store.dispatch(commentActions.clearCommentState());
    this.store.dispatch(checklistItemActions.clearChecklistItemState());
    this.store.dispatch(labelActions.clearLabelState());
    this.routeSubscription.unsubscribe();
    this.gateway.disconnect();
  }

  protected readonly take = take;
}
