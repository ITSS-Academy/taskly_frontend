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
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {NavbarComponent} from '../../../../components/navbar/navbar.component';
import {MaterialModule} from '../../../../shared/modules/material.module';
import {BackgroundColorService} from '../../../../services/background-color/background-color.service';
import {HomeNavComponent} from '../home-nav/home-nav.component';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {CardState} from '../../../../ngrx/card/card.state';
import * as cardActions from '../../../../ngrx/card/card.actions';
import {TaskDescriptionComponent} from '../../../../components/task-description/task-description.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [NavbarComponent, MaterialModule, ReactiveFormsModule, NgStyle, HomeNavComponent, NgForOf, NgIf],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent implements AfterViewInit,OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'board', 'list', 'members', 'tags'];
  dataSource = new MatTableDataSource<any>;
  readonly panelOpenState = signal(false);
  private dialog: any;

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
      this.store.select('card').subscribe((cardState) => {
        this.dataSource.data = cardState.cards
      }),
    );
  }


  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getContrastTextColor(hexColor: string) {
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    return brightness > 186 ? '#000000' : '#FFFFFF';
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

