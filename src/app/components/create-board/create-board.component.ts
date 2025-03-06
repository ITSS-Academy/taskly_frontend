import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import * as boardActions from '../../ngrx/board/board.actions';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [
    MaterialModule,
    NgForOf,
    ReactiveFormsModule

  ],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss'
})
export class CreateBoardComponent {
  imageBackgrounds = [
    'assets/images/bg1.jpg',
    'assets/images/bg2.jpg',
    'assets/images/bg3.jpg',
    'assets/images/bg4.jpg'
  ];
  colorBackgrounds = ['#D3D3D3', '#A8E6CF', '#377D6A', '#1D4F73'];
  boardForm = new FormGroup(
    {
      title: new FormControl('', [Validators.required]),
      image: new FormControl<File | null>(null, [Validators.required]),
    }
  );

  constructor(public dialogRef: MatDialogRef<CreateBoardComponent>,
              private store: Store<{ board: BoardState }>) {
  }

  selectBackground(background: string) {
    console.log('Selected background:', background);
  }

  createBoard() {
    if (this.boardForm.get('title')?.valid && this.boardForm.get('image')?.valid) {
      console.log('Creating board with title:', this.boardForm.get('title')?.value);
      this.dialogRef.close();

      this.store.dispatch(boardActions.createBoard({
        board: {
          name: this.boardForm.get('title')?.value ?? 'Board Name',
          background: this.boardForm.get('image')!.value,
        }
      }));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.boardForm.patchValue({image: file});
    }
  }
}
