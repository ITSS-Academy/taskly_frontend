import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardState } from '../../../../../../ngrx/board/board.state';
import { ListState } from '../../../../../../ngrx/list/list.state';
import { ListModel } from '../../../../../../models/list.model';
import { DatePipe, NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { MatChip } from '@angular/material/chips';
import { TaskDescriptionComponent } from '../../../../../../components/task-description/task-description.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../../shared/modules/material.module';
import { CdkNoDataRow } from '@angular/cdk/table';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    MatRow,
    MatHeaderRow,
    MatPaginator,
    MatCell,
    MatHeaderCell,
    MatChip,
    MatCellDef,
    MaterialModule,
    MatHeaderCellDef,
    MatColumnDef,
    NgForOf,
    NgIf,
    MatHeaderRowDef,
    MatRowDef,
    MatTable,
    NgStyle,
    DatePipe,
    NgClass,
    CdkNoDataRow,
    NgxSkeletonLoaderComponent,
  ],
  standalone: true,
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  isGettingCards!: boolean;

  constructor(private store: Store<{ board: BoardState; list: ListState }>) {
  }

  lists: ListModel[] = [];
  cards: any[] = [];
  subscription: Subscription[] = [];

  displayedColumns: string[] = [
    'title',
    'list',
    'members',
    'labels',
    'dueDate',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.subscription.push(
      this.store
        .select('list', 'isGettingLists')
        .subscribe((isGettingLists) => {
          this.isGettingCards = isGettingLists;
        }),
      this.store.select('list', 'lists').subscribe((lists) => {
        this.lists = lists;

        // Lấy tất cả các thẻ (cards) từ danh sách (lists)
        this.cards = lists.flatMap((list) => {
          return (list.cards || []).map((card) => ({
            ...card,
            listName: list.title,
            dueDate: card.dueDate || null,
          }));
        });

        this.dataSource.data = this.cards;
      }),
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  getListName(listId: string): string {
    const list = this.lists.find((l) => l.id === listId);
    return list ? list.title : 'Unknown';
  }

  getContrastTextColor(hexColor: string) {
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    return brightness > 186 ? '#000000' : '#FFFFFF';
  }

  isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    const today = new Date();
    return new Date(dueDate) < today;
  }

  openTaskDescription(row: any): void {
    this.dialog.open(TaskDescriptionComponent, {
      data: row.id,
    });
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
