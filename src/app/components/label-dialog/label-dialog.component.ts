import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/modules/material.module';
import { NgForOf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelListComponent } from '../label-list/label-list.component'; // Import LabelListComponent

interface Label {
  name: string;
  color: string;
  selected: boolean;
}

@Component({
  templateUrl: './label-dialog.component.html',
  imports: [MaterialModule, NgStyle, FormsModule, NgForOf],
  standalone: true,
  styleUrls: ['./label-dialog.component.scss']
})
export class LabelDialogComponent {
  readonly labelRef = inject(MatDialogRef<LabelDialogComponent>);
  private dialog = inject(MatDialog); // Inject MatDialog để mở dialog mới

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

  // ✅ Mở label-list khi nhấn "Tạo nhãn mới"
  createNewLabel() {
    this.dialog.open(LabelListComponent, {
      width: '400px'
    });
  }

  editLabel(label: Label) {
    console.log("Chỉnh sửa nhãn:", label);
  }
}
