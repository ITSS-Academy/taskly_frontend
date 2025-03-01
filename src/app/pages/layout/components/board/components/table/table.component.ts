import {Component} from '@angular/core';
import {NavbarComponent} from "../../../../../../components/navbar/navbar.component";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {BoardState} from '../../../../../../ngrx/board/board.state';
import {Store} from '@ngrx/store';
import * as boardActions from '../../../../../../ngrx/board/board.actions';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<{ board: BoardState }>) {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.store.dispatch(boardActions.getBoard({boardId: id}));
    });
  }

}
