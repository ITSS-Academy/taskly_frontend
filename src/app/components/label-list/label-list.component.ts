import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-label-list',
  templateUrl: 'label-list.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatButton
  ],
  styleUrls: ['./label-list.component.scss']
})
export class LabelListComponent {
  labelTitle: string = '';
  selectedColor: string = ''; // Màu được chọn
  colors: string[] = [
    '#D5E8D4', '#FFF2CC', '#F8CECC', '#F5E1FD', '#E3D7FF',
    '#6DECB9', '#FFE599', '#FFAB91', '#FF8A80', '#B39DDB',
    '#1B5E20', '#996515', '#B71C1C', '#6A1B9A', '#303F9F',
    '#C5CAE9', '#B2EBF2', '#D7FCC9', '#F8BBD0', '#D6D6D6',
    '#64B5F6', '#81C784', '#AED581', '#FF80AB', '#9E9E9E',
    '#01579B', '#00838F', '#2E7D32', '#8E24AA', '#546E7A'
  ];

  constructor(private dialogRef: MatDialogRef<LabelListComponent>) {}

  selectColor(color: string) {
    this.selectedColor = color;
  }

  removeColor() {
    this.selectedColor = '';
  }

  createLabel() {
    console.log("Tạo nhãn:", { title: this.labelTitle, color: this.selectedColor });
    this.dialogRef.close();
  }
}
