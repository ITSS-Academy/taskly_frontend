import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Label {
  name: string;
  color: string;
  selected: boolean;
}

@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss']
})
export class LabelDialogComponent {
  searchText = '';
  labels: Label[] = [
    { name: 'Xanh lá cây', color: '#2ECC71', selected: true },
    { name: 'Đỏ', color: '#E74C3C', selected: false },
    { name: 'Tím', color: '#9B59B6', selected: false },
    { name: 'Xanh dương', color: '#3498DB', selected: false }
  ];

  constructor(public dialogRef: MatDialogRef<LabelDialogComponent>) {}

  filteredLabels() {
    return this.labels.filter(label => label.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  createNewLabel() {
    console.log("Tạo nhãn mới");
  }

  editLabel(label: Label) {
    console.log("Chỉnh sửa nhãn:", label);
  }
}
