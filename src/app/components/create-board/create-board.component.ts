import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import * as boardActions from '../../ngrx/board/board.actions';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShareSnackbarComponent} from '../share-snackbar/share-snackbar.component';
import {BackgroundState} from '../../ngrx/background/background.state';
import * as backgroundActions from '../../ngrx/background/background.actions';


@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [MaterialModule, NgForOf, ReactiveFormsModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent implements OnInit {
  imageBackgrounds: {
    id: string;
    fileName?: string;
    fileLocation: string;
  }[] = [];

  imageUrl!: string;
  backgroundId!: string;

  colorBackgrounds = ['#D3D3D3', '#A8E6CF', '#377D6A', '#1D4F73', '#1D4F73'];
  boardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl<File | null>(null, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateBoardComponent>,
    private store: Store<{ board: BoardState, background: BackgroundState }>,
  ) {
    this.store.dispatch(backgroundActions.getBackgrounds());
  }

  ngOnInit() {
    this.store
      .select('background', 'backgrounds')
      .subscribe((backgrounds) => {
        if (backgrounds) {
          this.imageBackgrounds = backgrounds;
          console.log('background:', this.imageBackgrounds)
        }
      })
  }

  selectBackground(background: string, id: string) {
    this.imagePreview = background
    this.imageUrl = background
    this.boardForm.get('image')?.setValue(null)
    this.backgroundId = id
  }

  createBoard() {
    if (!this.boardForm.get('title')?.valid) {
      this._snackBar.openFromComponent(ShareSnackbarComponent, {
        data: 'Please fill in the title',
        duration: 2000,
      })
      return
    }

    if (!this.imagePreview || this.imagePreview == '') {
      this._snackBar.openFromComponent(ShareSnackbarComponent, {
        data: 'Please select a background',
        duration: 2000,
      })
      return
    }

    if (
      this.boardForm.get('image')?.valid
    ) {
      console.log(
        'Creating board with title:',
        this.boardForm.get('title')?.value,
      );

      this.store.dispatch(
        boardActions.createBoard({
          board: {
            name: this.boardForm.get('title')?.value ?? 'Board Name',
            background: this.boardForm.get('image')!.value,
          },
        }),
      );

      this.dialogRef.close();
    } else {
      this.store.dispatch(
        boardActions.createBoard({
          board: {
            name: this.boardForm.get('title')?.value ?? 'Board Name',
            backgroundId: this.backgroundId,
          },
        }),
      );
      this.dialogRef.close();
    }
  }

  private _snackBar = inject(MatSnackBar);

  imagePreview: string | null = null; // Chỉ lưu một ảnh

  // Hàm mở trình chọn ảnh
  openFilePicker(): void {
    document.querySelector<HTMLInputElement>('input[type="file"]')?.click();
  }

  // Hàm xử lý khi chọn ảnh
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      this.boardForm.get('image')?.setValue(file);

      reader.onload = () => {
        this.imagePreview = reader.result as string; // Gán ảnh vào biến để hiển thị
        this.imageUrl = '';
      };

      reader.readAsDataURL(file);
    }
  }
}
