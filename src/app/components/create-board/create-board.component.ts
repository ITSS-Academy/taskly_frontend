import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardState } from '../../ngrx/board/board.state';
import * as boardActions from '../../ngrx/board/board.actions';
import { MaterialModule } from '../../shared/modules/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareSnackbarComponent } from '../share-snackbar/share-snackbar.component';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [MaterialModule, NgForOf, ReactiveFormsModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent {
  imageBackgrounds = [
    'assets/images/bg1.jpg',
    'assets/images/bg2.jpg',
    'assets/images/bg3.jpg',
    'assets/images/bg4.jpg',
  ];
  colorBackgrounds = ['#D3D3D3', '#A8E6CF', '#377D6A', '#1D4F73', '#1D4F73'];
  boardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl<File | null>(null, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateBoardComponent>,
    private store: Store<{ board: BoardState }>,
  ) {}

  selectBackground(background: string) {
    console.log('Selected background:', background);
  }

  createBoard() {
    if (
      this.boardForm.get('title')?.valid &&
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
      this._snackBar.openFromComponent(ShareSnackbarComponent, {
        verticalPosition: 'bottom',
        horizontalPosition: 'start',
        data: 'Please fill in all required fields',
        duration: 2000,
      });
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
      };

      reader.readAsDataURL(file);
    }
  }
}
