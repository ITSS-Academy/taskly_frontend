import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NotificationsComponent} from '../notifications/notifications.component';
import {NotificationsButtonComponent} from '../notifications-button/notifications-button.component';
import {ShareComponent} from '../share/share.component';
import {BackgroundComponent} from '../background/background.component';
import {BackgroundColorService} from '../../services/background-color/background-color.service';
import {NgStyle} from '@angular/common';
import {FilterComponent} from '../filter/filter.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import {LogoutButtonComponent} from '../logout-button/logout-button.component';
import * as notificationsActions from '../../ngrx/notifications/notifications.actions';
import {NotificationsState} from '../../ngrx/notifications/notifications.state';
import * as labelActions from '../../ngrx/label/label.actions';
import {LabelState} from '../../ngrx/label/label.state';
import {Subscription} from 'rxjs';
import * as boardActions from '../../ngrx/board/board.actions';
import {ListState} from '../../ngrx/list/list.state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    NotificationsButtonComponent,
    NgStyle,
    LogoutButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  textColor: string = '#000000';
  navbarColor: string = '';
  inputValue: string = 'Board Name';
  placeholder: string = 'Board Name';
  isEditing: boolean = false;
  inputWidth: number = 12;
  id!: string;
  isFiltering!: boolean;

  @ViewChild('textInput', {static: false})
  textInput!: ElementRef<HTMLInputElement>;
  @ViewChild('textMeasurer', {static: true})
  textMeasurer!: ElementRef<HTMLSpanElement>;

  constructor(
    private cdr: ChangeDetectorRef,
    private backgroundColorService: BackgroundColorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      board: BoardState;
      notifications: NotificationsState;
      label: LabelState;
      list: ListState;
    }>,
  ) {
  }

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.backgroundColorService.textColor$.subscribe((color) => {
        this.textColor = color;
      }),
      this.backgroundColorService.navbarColor$.subscribe((color) => {
        this.navbarColor = color;
        console.log('navbarColor', this.navbarColor)
      }),
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          console.log(board);
          this.id = board.id!;
          this.inputValue = board.name!;
        }
      }),
      this.store
        .select('label', 'isGetLabelForFilterSuccess')
        .subscribe((success) => {
          if (success) {
            this.filterDialog.open(FilterComponent, {
              enterAnimationDuration: '0.1s',
              exitAnimationDuration: '0.1s',
            });
          }
        }),
      this.store.select('list', 'isFiltering').subscribe((isFiltering) => {
        this.isFiltering = isFiltering;
      }),
    );
  }

  ngAfterViewInit() {
    this.adjustWidth();
  }

  enableEditing(): void {
    this.isEditing = true;

    this.cdr.detectChanges();
    setTimeout(() => {
      this.adjustWidth();
      this.textInput.nativeElement.focus();
      this.textInput.nativeElement.select();
    }, 0);
  }

  disableEditing(): void {
    this.store.dispatch(
      boardActions.changeBoardName({boardId: this.id, name: this.inputValue}),
    );
    this.isEditing = false;
  }

  adjustWidth(): void {
    if (this.textMeasurer) {
      this.textMeasurer.nativeElement.textContent = this.inputValue
        ? this.inputValue
        : '';
      this.inputWidth = this.textMeasurer.nativeElement.offsetWidth;
    }
  }

  readonly shareDialog = inject(MatDialog);

  openShareDialog() {
    const dialogRef = this.shareDialog.open(ShareComponent, {
      data: this.id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  readonly backgroundDialog = inject(MatDialog);
  readonly filterDialog = inject(MatDialog);

  openBackgroundDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.backgroundDialog.open(BackgroundComponent, {
      // width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openFilterDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.store.dispatch(labelActions.getLabelForFilter({id: this.id}));
  }

  routeKanban() {
    console.log(this.id);
    this.router.navigate(['/board/kanban', this.id]);
  }

  routeTable() {
    console.log(this.id);
    this.router.navigate(['/board/table', this.id]);
  }
}
