import {AfterViewInit, Component, OnInit, signal, ViewChild} from '@angular/core';
import {NavbarComponent} from "../../../../../../components/navbar/navbar.component";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {BoardState} from '../../../../../../ngrx/board/board.state';
import {Store} from '@ngrx/store';
import * as boardActions from '../../../../../../ngrx/board/board.actions';
import {HomeNavComponent} from "../../../home-nav/home-nav.component";
import {MaterialModule} from '../../../../../../shared/modules/material.module';
import {MatTableDataSource} from '@angular/material/table';
import {BackgroundColorService} from '../../../../../../services/background-color/background-color.service';
import {MatPaginator} from '@angular/material/paginator';
import {BoardModel} from '../../../../../../models/board.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    HomeNavComponent,
    MaterialModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {
  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<{ board: BoardState }>) {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.store.dispatch(boardActions.getBoard({boardId: id}));
    });

    this.store.select('board').subscribe(board => {
      console.log('board', board);
    });
  }


  displayedColumns: string[] = ['title', 'board', 'list', 'members', 'tags'];
  dataSource = new MatTableDataSource<BoardModel>([]);
  readonly panelOpenState = signal(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
