import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from "../../shared/modules/material.module";
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NotificationsComponent} from '../notifications/notifications.component';
import {NotificationsButtonComponent} from '../notifications-button/notifications-button.component';
import {ShareComponent} from '../share/share.component';
import {BackgroundComponent} from '../background/background.component';
import {BackgroundColorService} from '../../services/background-color/background-color.service';
import {NgStyle} from '@angular/common';
import {FilterComponent} from '../filter/filter.component';
import {LogoutComponent} from '../logout/logout.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule, FormsModule, NotificationsButtonComponent, NgStyle],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, AfterViewInit {
  textColor: string = '#000000';
  inputValue: string = "Board Name";
  placeholder: string = "Board Name";
  isEditing: boolean = false;
  inputWidth: number = 12;
  id!: string;

  @ViewChild('textInput', {static: false}) textInput!: ElementRef<HTMLInputElement>;
  @ViewChild('textMeasurer', {static: true}) textMeasurer!: ElementRef<HTMLSpanElement>;

  constructor(private cdr: ChangeDetectorRef,
              private backgroundColorService: BackgroundColorService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<{ board: BoardState }>) {
    this.store.select('board', 'board').subscribe((board) => {
      if (board) {
        this.id = board.id!;
        this.inputValue = board.name!;
      }
    })
  }

  ngOnInit(): void {
    this.backgroundColorService.textColor$.subscribe(color => {
      this.textColor = color;
    });
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
    this.isEditing = false;
  }

  adjustWidth(): void {
    if (this.textMeasurer) {
      this.textMeasurer.nativeElement.textContent = this.inputValue ? this.inputValue : '';
      this.inputWidth = this.textMeasurer.nativeElement.offsetWidth;
    }
  }

  readonly shareDialog = inject(MatDialog);

  openShareDialog() {
    const dialogRef = this.shareDialog.open(ShareComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  readonly backgroundDialog = inject(MatDialog);
  readonly filterDialog = inject(MatDialog);

  openBackgroundDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.backgroundDialog.open(BackgroundComponent, {
      // width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openFilterDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.filterDialog.open(FilterComponent, {
      // width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openLogoutDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.backgroundDialog.open(LogoutComponent, {
      // width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
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

