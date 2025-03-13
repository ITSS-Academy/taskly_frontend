import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LoginComponent } from '../../../login/login.component';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import * as authActions from '../../../../ngrx/auth/auth.actions';
import { logout } from '../../../../ngrx/auth/auth.actions';
import { BackgroundColorService } from '../../../../services/background-color/background-color.service';
import { BoardModel } from '../../../../models/board.model';
import { Observable, Subscription } from 'rxjs';
import * as boardActions from '../../../../ngrx/board/board.actions';
import { BoardState } from '../../../../ngrx/board/board.state';
import { AsyncPipe, NgStyle } from '@angular/common';
import { BackgroundPipe } from '../../../../shared/pipes/background.pipe';
import { Router, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from '../../../../services/notification/notifications.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    HomeNavComponent,
    MatButton,
    MatIcon,
    LoginComponent,
    AsyncPipe,
    NgStyle,
    BackgroundPipe,
    RouterLink,
    NgxSkeletonLoaderComponent,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  isSlideBarVisible = false;
  boards$!: Observable<BoardModel[] | null>;
  invitedBoards$!: Observable<BoardModel[] | null>;
  isGettingBoards!: boolean;
  boards: BoardModel[] = [];

  constructor(
    private backgroundService: BackgroundColorService,
    private notificationService: NotificationsService,
    private router: Router,
    private store: Store<{ auth: AuthState; board: BoardState }>,
  ) {
    this.backgroundService.setNavbarTextColor('rgb(0, 0, 0)');
    this.backgroundService.setSidebarColor('rgb(245, 255, 248)');
    this.backgroundService.setLogo('rgb(245, 255, 248)');
    // this.store.dispatch(boardActions.getBoards());
  }

  subcriptions: Subscription[] = [];

  ngOnInit(): void {
    this.boards$ = this.store.select('board', 'boards');
    this.invitedBoards$ = this.store.select('board', 'invitedBoards');
    this.subcriptions.push(
      this.store
        .select('board', 'isBoardsGetting')
        .subscribe((isGettingBoards) => {
          this.isGettingBoards = isGettingBoards;
          console.log('isGettingBoards', isGettingBoards);
        }),
      this.store.select('board', 'boards').subscribe((boards) => {
        this.boards = boards ? boards : [];
      }),
    );
  }

  ngOnDestroy() {
    this.subcriptions.forEach((s) => s.unsubscribe());
  }

  navigateToBoard(boardId: string): void {
    this.router
      .navigate(['/board/kanban', boardId])
      .then((r) => console.log(r));
  }

  readonly dialog = inject(MatDialog);

  deleteBoard(boardId: string, event: Event): void {
    event.stopPropagation(); // Stop event propagation

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        boardId: boardId,
        title: 'Delete Board',
        message: 'Are you sure you want to delete this board?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Deleting board with ID: ${boardId}`);
        this.store.dispatch(boardActions.deleteBoard({ boardId })); // Dispatch delete action
        const userIds =
          this.boards.find((b) => b.id === boardId)?.members || [];
        console.log(this.boards);
        console.log(userIds);
        this.store.dispatch(
          boardActions.addUserIdsBeKicked({ boardId, userIds }),
        );
      } else {
        console.log('Board deletion canceled');
      }
    });
  }

  onLinkActivated(): void {
    this.isSlideBarVisible = false;
  }
}
