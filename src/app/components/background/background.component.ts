import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {BackgroundColorService} from '../../services/background-color/background-color.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {BoardModel} from '../../models/board.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import * as boardActions from '../../ngrx/board/board.actions';
import {BoardState} from '../../ngrx/board/board.state';
import {NgForOf, NgStyle} from '@angular/common';
import {Subscription} from 'rxjs';
import * as backgroundActions from '../../ngrx/background/background.actions';
import {BackgroundState} from '../../ngrx/background/background.state';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, NgForOf, NgStyle],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
})
export class BackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('previewImage', {static: false})
  previewImage!: ElementRef<HTMLImageElement>;
  imageUrl!: string;
  file: File | null = null;
  boardId!: string;

  constructor(
    private backgroundColorService: BackgroundColorService,
    private dialogRef: MatDialogRef<BackgroundComponent>, // Inject MatDialogRef
    private store: Store<{
      auth: AuthState;
      board: BoardState;
      background: BackgroundState;
    }>,
  ) {
    this.store.dispatch(backgroundActions.getBackgrounds());
  }

  subscribtions: Subscription[] = [];

  ngOnInit() {
    this.subscribtions.push(
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.boardId = board.id!;
        }
      }),
      this.store
        .select('background', 'backgrounds')
        .subscribe((backgrounds) => {
          if (backgrounds) {
            this.imageBackgrounds = backgrounds;
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscribtions.forEach((sub) => sub.unsubscribe());
  }

  imageBackgrounds: {
    id: string;
    fileName?: string;
    fileLocation: string;
  }[] = [];

  // colorBackgrounds = ['#D3D3D3', '#A8E6CF', '#377D6A', '#1D4F73'];
  imagePreview: string | null = null;
  form = new FormGroup({
    image: new FormControl<File | null>(null),
  });

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Selected file:', input.files);
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
    this.imageUrl = '';
  }

  extractPrimaryColor(imageUrl: string): void {
    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = 'Anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

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

      setTimeout(() => {
        this.backgroundColorService.setLogo(primaryColor);
        this.backgroundColorService.setSidebarColor(primaryColor);
        this.backgroundColorService.setNavbarTextColor(primaryColor);
      }, 100);
    };
  }

  onAccept() {
    if (!this.imageUrl) {
      if (this.file) {
        this.store.dispatch(
          boardActions.changeBoardBackground({
            boardId: this.boardId,
            background: this.file,
          }),
        );

        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result as string;
          setTimeout(() => {
            this.extractPrimaryColor(this.imageUrl);

            this.dialogRef.close(); // ✅ Auto-close the dialog
          }, 100);
        };

        reader.readAsDataURL(this.file);
      }
    } else {
      //find id of image
      const id = this.imageBackgrounds.find(
        (image) => image.fileLocation === this.imageUrl,
      )?.id;

      if (id) {
        this.store.dispatch(
          boardActions.changeBoardBackground({
            boardId: this.boardId,
            backgroundId: id,
          }),
        );
      }

      setTimeout(() => {
        this.extractPrimaryColor(this.imageUrl);

        this.dialogRef.close(); // ✅ Auto-close the dialog
      }, 100);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onBackgroundSelected(fileLocation: string) {
    console.log('Selected background:', fileLocation);
    this.imageUrl = fileLocation;
    this.imagePreview = fileLocation;
  }
}
