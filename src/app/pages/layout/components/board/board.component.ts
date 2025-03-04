import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../../../../components/navbar/navbar.component';
import {BackgroundColorService} from '../../../../services/background-color/background-color.service';
import {AsyncPipe, JsonPipe, NgStyle} from '@angular/common';
import {BoardState} from '../../../../ngrx/board/board.state';
import {Store} from '@ngrx/store';
import {combineLatest, EMPTY, filter, map, Observable, of, Subscription, switchMap, take} from 'rxjs';
import {BoardModel} from '../../../../models/board.model';
import {BackgroundPipe} from '../../../../shared/pipes/background.pipe';
import {GatewayService} from '../../../../services/gateway/gateway.service';
import {ListModel} from '../../../../models/list.model';
import {ListState} from '../../../../ngrx/list/list.state';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    NgStyle,
    AsyncPipe,
    BackgroundPipe,
    JsonPipe
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy {
  backgroundImage: string | null =
    'https://images.unsplash.com/photo-1542435503-956c469947f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVza3RvcHxlbnwwfHwwfHx8MA%3D%3D';

  constructor(private backgroundService: BackgroundColorService, private gateway: GatewayService,
              private store: Store<{
                board: BoardState,
                list: ListState
              }>) {
    this.board$ = this.store.select('board', 'board');

  }

  subscriptions: Subscription[] = [];
  board$!: Observable<BoardModel | null>

  ngOnInit(): void {
    this.gateway.message()
    this.subscriptions.push(
      this.store.select('board', 'board')
        .pipe(
          filter(board => !!board), // Lọc board null
          switchMap(board =>
            this.store.select('list', 'lists').pipe(
              map(lists => ({
                board,
                lists: lists?.filter(list => list.boardId === board.id) ?? []
              }))
            )
          )
        )
        .subscribe(({board, lists}) => {
          if (lists.length > 0 && board.listsCount) {
            console.log('🚀 Joining board:', board.id, 'with lists:', lists);
            this.gateway.joinBoard(board, lists);
          } else if (!board.listsCount) {
            console.log('🚀 Joining board:', board.id, 'with lists:', []);
            this.gateway.joinBoard(board, []);
          }
        }),


      this.store.select('board', 'board').subscribe((board) => {
        if (board) {

          if (board.background && typeof board.background === 'object' && 'fileLocation' in board.background) {
            this.extractPrimaryColor(board.background.fileLocation as string);
            this.backgroundImage = board.background.fileLocation as string;
          }
        }
      }),
      this.backgroundService.backgroundImage$.subscribe((imageUrl) => {
        this.backgroundImage = imageUrl;
      }),
    )

  }

  extractPrimaryColor(imageUrl: string): void {
    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = "Anonymous";

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < imageData.length; i += 4 * 100) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      const primaryColor = `rgb(${r}, ${g}, ${b})`;
      console.log('Extracted Sidebar Color:', primaryColor);

      this.backgroundService.setLogo(primaryColor);
      this.backgroundService.setSidebarColor(primaryColor);
      this.backgroundService.setNavbarTextColor(primaryColor);
    };
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
