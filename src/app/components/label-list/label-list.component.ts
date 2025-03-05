import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss']
})
export class LabelListComponent {
  constructor(public dialog: MatDialog) {}

  openLabelDialog() {
    this.dialog.open(LabelDialogComponent, {
      width: '350px'
    });
  }
}
