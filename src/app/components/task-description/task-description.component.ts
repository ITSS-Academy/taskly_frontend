import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-task-description',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    MaterialModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './task-description.component.html',
  styleUrl: './task-description.component.scss'
})
export class TaskDescriptionComponent {

  @Output() taskChange = new EventEmitter<any>();

  newTag = '';
  newSubtask = '';
  readonly dialogRef = inject(MatDialogRef<TaskDescriptionComponent>);
  readonly task = inject<any>(MAT_DIALOG_DATA);

  constructor() {
  }

  onClose() {
    this.dialogRef.close()
  }

  saveChanges() {
    this.taskChange.emit(this.task);
    this.dialogRef.close();
  }

  addTag() {
    if (this.newTag.trim() && !this.task.tags.includes(this.newTag.trim())) {
      this.task.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    this.task.tags = this.task.tags.filter((t: any) => t !== tag);
  }

  addSubtask() {
    if (this.newSubtask.trim()) {
      this.task.totalSubtasks++;
      this.newSubtask = '';
    }
  }

  toggleSubtask(completed: boolean) {
    if (completed) {
      this.task.completedSubtasks++;
    } else {
      this.task.completedSubtasks--;
    }
  }
}
