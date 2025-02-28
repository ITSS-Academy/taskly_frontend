import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatIcon,
    MatDialogActions,
    MatDialogTitle,
    MatInput,
    MatButton,
    MatLabel,
    NgForOf

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

  constructor(public dialogRef: MatDialogRef<CreateBoardComponent>) {
  }

  selectBackground(background: string) {
    console.log('Selected background:', background);
  }

}
