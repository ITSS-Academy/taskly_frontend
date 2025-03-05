import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../../components/sidebar/sidebar.component";
import {HomeNavComponent} from "./components/home-nav/home-nav.component";
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {LoginComponent} from '../../../login/login.component';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {Store} from '@ngrx/store';
import * as authActions from '../../../../ngrx/auth/auth.actions';
import {logout} from '../../../../ngrx/auth/auth.actions';
import {BackgroundColorService} from '../../../../services/background-color/background-color.service';
import {BoardModel} from '../../../../models/board.model';
import {Observable} from 'rxjs';
import * as boardActions from '../../../../ngrx/board/board.actions';
import {BoardState} from '../../../../ngrx/board/board.state';
import {AsyncPipe, NgStyle} from '@angular/common';
import {BackgroundPipe} from '../../../../shared/pipes/background.pipe';
import {RouterLink} from '@angular/router';

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
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isSlideBarVisible = false;
  boards$!: Observable<BoardModel[] | null>;

  constructor(private backgroundService: BackgroundColorService,
              private store: Store<{ auth: AuthState, board: BoardState }>) {
    this.backgroundService.setNavbarTextColor('rgb(0, 0, 0)');
    this.backgroundService.setSidebarColor('rgb(245, 255, 248)');
    this.backgroundService.setLogo('rgb(245, 255, 248)');
    this.store.dispatch(boardActions.getBoards());
  }

  ngOnInit(): void {
    this.boards$ = this.store.select('board', 'boards');
  }

  navigateToBoard(boardId: string): void {
    console.log(boardId);
  }

  onLinkActivated(): void {
    this.isSlideBarVisible = false;
  }
}
