import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import * as boardActions from '../../ngrx/board/board.actions';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';



@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,



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
      image: new FormControl<File | null>(null),
    }
  );
  imagePreview: string[] = [];


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
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }


  removeImage(index: number) {
    this.imagePreview.splice(index, 1);
  }

  protected readonly of = of;
  i: any;
}
