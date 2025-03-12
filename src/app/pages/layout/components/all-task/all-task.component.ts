import {
  Component,
  signal,
  ViewChild,
  OnInit,
  AfterViewInit, OnDestroy,
} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NgStyle} from '@angular/common';
import {NavbarComponent} from '../../../../components/navbar/navbar.component';
import {MaterialModule} from '../../../../shared/modules/material.module';
import {BackgroundColorService} from '../../../../services/background-color/background-color.service';
import {HomeNavComponent} from '../home-nav/home-nav.component';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {CardState} from '../../../../ngrx/card/card.state';
import * as cardActions from '../../../../ngrx/card/card.actions';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [NavbarComponent, MaterialModule, ReactiveFormsModule, NgStyle, HomeNavComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent implements AfterViewInit,OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'board', 'list', 'members', 'tags'];
  dataSource = new MatTableDataSource<any>;
  readonly panelOpenState = signal(false);

  constructor(private backgroundService: BackgroundColorService,
              private store: Store<{ card: CardState}>) {
    this.backgroundService.setLogo('rgb(245, 255, 248)');
    this.backgroundService.setNavbarTextColor('rgb(0, 0, 0)');
    this.backgroundService.setSidebarColor('rgb(245, 255, 248)');
    this.store.dispatch(cardActions.getCardsByUserId());
  }

  subscription: Subscription[] = [];

  ngOnInit() {
    this.subscription.push(
      this.store.select('card').subscribe((card) => {
        this.dataSource.data = card.cards;
      }),
    )
  }

  ngOnDestroy() {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selected = 'option2';
}

export interface PeriodicElement {
  title: string;
  board: string;
  list: string;
  members: string;
  tags: string;
}

