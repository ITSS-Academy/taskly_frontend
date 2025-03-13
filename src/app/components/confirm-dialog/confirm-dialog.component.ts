import {Component, Inject} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onConfirm(): void {
    this.dialogRef.close(true); // ✅ Return true if confirmed
  }

  onCancel(): void {
    this.dialogRef.close(false); // ❌ Return false if canceled
  }
}
