import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatSidenav} from '@angular/material/sidenav';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AsyncPipe, NgStyle} from '@angular/common';
import {BackgroundColorService} from '../../services/background-color/background-color.service';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import {Observable, Subscription, take} from 'rxjs';
import {BoardModel} from '../../models/board.model';
import * as boardActions from '../../ngrx/board/board.actions';
import {BackgroundPipe} from '../../shared/pipes/background.pipe';
import {MatDialog} from '@angular/material/dialog';
import {CreateBoardComponent} from '../create-board/create-board.component';
import {UserState} from '../../ngrx/user/user.state';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink,
    NgStyle,
    AsyncPipe,
    BackgroundPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  supcriptions: Subscription[] = [];
  boards$!: Observable<BoardModel[] | null>;
  invitedBoards$!: Observable<BoardModel[] | null>;

  user!: UserModel;

  constructor(
    private backgroundColorService: BackgroundColorService,
    private store: Store<{
      board: BoardState;
      user: UserState;
    }>,
    private router: Router
  ) {
    this.store.dispatch(boardActions.getBoards());
    this.store.dispatch(boardActions.getInvitedBoards());
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CreateBoardComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  logoImage!: string;
  sidebarColor: string = '#F5FFF8'; // Default color
  sidebarTextColor: string = '--md-sys-color-on-surface'; // Default text color

  ngOnInit() {
    this.boards$ = this.store.select('board', 'boards');
    this.invitedBoards$ = this.store.select('board', 'invitedBoards');

    this.supcriptions.push(
      this.backgroundColorService.logoImage$.subscribe((imageUrl) => {
        this.logoImage = imageUrl;
      }),

      this.backgroundColorService.sidebarColor$.subscribe((color) => {
        this.sidebarColor = color;
      }),

      this.backgroundColorService.textColor$.subscribe((color) => {
        this.sidebarTextColor = color;
      }),
      this.store
        .select('user', 'isGettingUserSuccess')
        .subscribe((isGettingUserSuccess) => {
          if (isGettingUserSuccess) {
            this.store
              .select('user', 'user')
              .pipe(take(1))
              .subscribe((user) => {
                if (user) {
                  this.user = user;
                }
              });
          }
        }),
    );
  }

  ngOnDestroy() {
    this.supcriptions.forEach((sub) => sub.unsubscribe());
    this.supcriptions = [];
  }
}
