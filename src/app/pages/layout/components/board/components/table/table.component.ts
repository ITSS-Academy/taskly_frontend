import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { NavbarComponent } from '../../../../../../components/navbar/navbar.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BoardState } from '../../../../../../ngrx/board/board.state';
import { Store } from '@ngrx/store';
import * as boardActions from '../../../../../../ngrx/board/board.actions';
import { HomeNavComponent } from '../../../home-nav/home-nav.component';
import { MaterialModule } from '../../../../../../shared/modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { BackgroundColorService } from '../../../../../../services/background-color/background-color.service';
import { MatPaginator } from '@angular/material/paginator';
import { BoardModel } from '../../../../../../models/board.model';
import { ListModel } from '../../../../../../models/list.model';
import { Subscription } from 'rxjs';
import { ListState } from '../../../../../../ngrx/list/list.state';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, HomeNavComponent, MaterialModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ board: BoardState; list: ListState }>,
  ) {}

  lists: ListModel[] = [];
  cards: any[] = [];
  subscription: Subscription[] = [];

  ngOnInit() {
    this.subscription.push(
      this.store.select('list', 'lists').subscribe((lists) => {
        this.lists = lists;
        //flat the lists to get all cards
        this.cards = lists.map((list) => list.cards).flat();
        console.log(this.cards);

        this.dataSource.data = this.cards;
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  displayedColumns: string[] = ['title', 'list', 'members', 'tags'];
  dataSource = new MatTableDataSource<BoardModel>();
  readonly panelOpenState = signal(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
