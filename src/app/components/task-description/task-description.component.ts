import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MaterialModule} from '../../shared/modules/material.module';
import {LabelDialogComponent} from '../label-dialog/label-dialog.component';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import {Subscription} from 'rxjs';
import {LabelState} from '../../ngrx/label/label.state';
import * as labelActions from '../../ngrx/label/label.actions';

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
  templateUrl: 'task-description.component.html',
  styleUrl: './task-description.component.scss'
})
export class TaskDescriptionComponent implements OnInit {

  @Output() taskChange = new EventEmitter<any>();

  newTag = '';
  newSubtask = '';
  readonly dialogRef = inject(MatDialogRef<TaskDescriptionComponent>);
  readonly task = inject<any>(MAT_DIALOG_DATA);

  readonly dialog = inject(MatDialog);

  boardId!: string
  subscriptions: Subscription[] = [];

  constructor(private store: Store<{
    board: BoardState,
    label: LabelState
  }>) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.boardId = board.id!;
        }
      }),
      this.store.select('label', 'isGetLabelsInBoardSuccess').subscribe((isSuccess) => {
        if (isSuccess) {
          this.dialog.open(LabelDialogComponent)
        }
      })
    )
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


  createLabel() {

  }

  openLabelDialog() {
    this.store.dispatch(labelActions.getLabelsInBoard({id: this.boardId}));
  }
}
