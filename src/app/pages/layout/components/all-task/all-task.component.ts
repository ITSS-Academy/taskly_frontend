import {
  Component,
  signal,
  ViewChild,
  OnInit,
  AfterViewInit,
  inject,
  OnDestroy,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { BackgroundColorService } from '../../../../services/background-color/background-color.service';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardState } from '../../../../ngrx/card/card.state';
import * as cardActions from '../../../../ngrx/card/card.actions';
import { TaskDescriptionComponent } from '../../../../components/task-description/task-description.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkNoDataRow } from '@angular/cdk/table';
import { ListCard } from '../../../../models/list.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';



@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [
    NavbarComponent,
    MaterialModule,
    ReactiveFormsModule,
    NgStyle,
    HomeNavComponent,
    NgForOf,
    NgIf,
    CdkNoDataRow,
    DatePipe,
    MatSortModule,
    NgxSkeletonLoaderComponent
  ],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'board', 'list', 'members', 'tags'];
  dataSource = new MatTableDataSource<any>();
  readonly panelOpenState = signal(false);
  private dialog: any;

  isGettingCards!: boolean;
  cards!: ListCard[];

  constructor(
    private backgroundService: BackgroundColorService,
    private store: Store<{ card: CardState }>,
    private router: Router,
  ) {
    this.backgroundService.setLogo('rgb(245, 255, 248)');
    this.backgroundService.setNavbarTextColor('rgb(0, 0, 0)');
    this.backgroundService.setSidebarColor('rgb(245, 255, 248)');
    this.store.dispatch(cardActions.getCardsByUserId());
  }

  subscription: Subscription[] = [];

  ngOnInit() {
    this.subscription.push(
      this.store.select('card').subscribe((cardState) => {
        this.dataSource.data = cardState.cards;
        this.cards = cardState.cards;
      }),
      this.store
        .select('card', 'isGettingCardsByUser')
        .subscribe((isGettingCards) => {
          this.isGettingCards = isGettingCards;
        }),
    );
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.labels
        ? data.labels.some((label: any) =>
          label.name.toLowerCase().includes(filter),
        )
        : false;
    };
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getContrastTextColor(hexColor: string) {
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    return brightness > 186 ? '#000000' : '#FFFFFF';
  }

  selected = 'option2';

  navigateToBoard(id: string) {
    this.router.navigate(['/board/kanban', id]);

  }

  @ViewChild(MatSort) sort!: MatSort;
  private _liveAnnouncer = inject(LiveAnnouncer);


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      const sortedData = [...this.dataSource.data].sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : null;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : null;

        if (dateA === null) return 1;
        if (dateB === null) return -1;

        return sortState.direction === 'asc' ? dateA - dateB : dateB - dateA;
      });

      this.dataSource.data = sortedData;
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.dataSource.data = this.cards;
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

