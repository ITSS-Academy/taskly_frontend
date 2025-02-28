import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from "../../shared/modules/material.module";
import {MatSidenav} from "@angular/material/sidenav";
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgStyle} from '@angular/common';
import {BackgroundColorService} from '../../services/background-color/background-color.service';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import {Observable, Subscription} from 'rxjs';
import {BoardModel} from '../../models/board.model';
import * as boardActions from '../../ngrx/board/board.actions';
import {BackgroundPipe} from '../../shared/pipes/background.pipe'
import {MatDialog} from '@angular/material/dialog';
import {CreateBoardComponent} from '../create-board/create-board.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterLink, NgStyle, AsyncPipe, BackgroundPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})


export class SidebarComponent implements OnInit {

  supcriptions!: Subscription[];
  boards$ !: Observable<BoardModel[] | null>

  constructor(private backgroundColorService: BackgroundColorService,
              private store: Store<{
                board: BoardState
              }>) {
    this.store.dispatch(boardActions.getBoards());
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CreateBoardComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  invitedBoards = [
    {
      name: 'Trip to Japan',
      background:
        'https://t3.ftcdn.net/jpg/05/13/59/72/360_F_513597277_YYqrogAmgRR9ohwTUnOM784zS9eYUcSk.jpg',
    },
  ];

  sidebarColor: string = '--md-sys-color-on-secondary-container'; // Default color
  sidebarTextColor: string = '--md-sys-color-on-surface'; // Default text color

  ngOnInit() {
    this.boards$ = this.store.select('board', 'boards');

    this.backgroundColorService.sidebarColor$.subscribe(color => {
      this.sidebarColor = color;
    });

    this.backgroundColorService.textColor$.subscribe(color => {
      this.sidebarTextColor = color;
    });
  }
}
