import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../../../../components/navbar/navbar.component';
import {BackgroundColorService} from '../../../../services/background-color/background-color.service';
import {AsyncPipe, JsonPipe, NgStyle} from '@angular/common';
import {BoardState} from '../../../../ngrx/board/board.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {BoardModel} from '../../../../models/board.model';
import {BackgroundPipe} from '../../../../shared/pipes/background.pipe';


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
export class BoardComponent implements OnInit {
  backgroundImage: string | null =
    'https://images.unsplash.com/photo-1542435503-956c469947f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVza3RvcHxlbnwwfHwwfHx8MA%3D%3D';

  constructor(private backgroundService: BackgroundColorService,
              private store: Store<{ board: BoardState }>) {
    this.board$ = this.store.select('board', 'board');

  }

  board$!: Observable<BoardModel | null>

  ngOnInit(): void {
    this.store.select('board', 'board').subscribe((board) => {
      if (board) {
        if (board.background && typeof board.background === 'object' && 'fileLocation' in board.background) {
          this.extractPrimaryColor(board.background.fileLocation as string);
          this.backgroundImage = board.background.fileLocation as string;
        }
      }
    })
    this.backgroundService.backgroundImage$.subscribe((imageUrl) => {
      this.backgroundImage = imageUrl;
    });
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

      this.backgroundService.setSidebarColor(primaryColor);
      this.backgroundService.setNavbarTextColor(primaryColor);
    };
  }



}
