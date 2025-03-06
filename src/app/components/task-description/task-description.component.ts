import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material.module';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component';
import { Store } from '@ngrx/store';
import { BoardState } from '../../ngrx/board/board.state';
import { Observable, Subscription } from 'rxjs';
import { LabelState } from '../../ngrx/label/label.state';
import * as labelActions from '../../ngrx/label/label.actions';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommentModel } from '../../models/comment.model';
import { ChecklistItemModel } from '../../models/checklistItem.model';
import { CardModel } from '../../models/card.model';
import { CardState } from '../../ngrx/card/card.state';
import * as cardActions from '../../ngrx/card/card.actions';
import { UserState } from '../../ngrx/user/user.state';
import { LabelPipe } from '../../shared/pipes/label.pipe';

@Component({
  selector: 'app-task-description',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    MaterialModule,
    NgIf,
    NgForOf,
    MatDatepickerModule,
    MatNativeDateModule,
    TextFieldModule,
    AsyncPipe,
    NgStyle,
    LabelPipe,
  ],
  templateUrl: 'task-description.component.html',
  styleUrl: './task-description.component.scss',
})
export class TaskDescriptionComponent implements OnInit, OnDestroy {
  newTag = '';
  newSubtask = '';
  newComment = '';
  showAssigneeSelector = false;

  // Create a local task copy that we can modify
  task!: CardModel;

  readonly dialogRef = inject(MatDialogRef<TaskDescriptionComponent>);
  readonly cardId = inject(MAT_DIALOG_DATA);

  // Data for tasks
  currentUser!: string;

  readonly dialog = inject(MatDialog);

  boardId!: string;
  subscriptions: Subscription[] = [];

  completedItems = 0;
  totalItems = 0;

  isGettingCard!: Observable<boolean>;

  constructor(
    private store: Store<{
      board: BoardState;
      label: LabelState;
      card: CardState;
      user: UserState;
    }>,
  ) {
    this.store.dispatch(cardActions.getCard({ cardId: this.cardId }));
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.boardId = board.id!;
        }
      }),
      this.store
        .select('label', 'isGetLabelsInBoardSuccess')
        .subscribe((isSuccess) => {
          if (isSuccess) {
            this.dialog.open(LabelDialogComponent);
          }
        }),
      this.store.select('card', 'card').subscribe((card) => {
        if (card) {
          console.log(card);
          this.task = card;
          this.completedItems = this.task.checklistItems!.filter(
            (item) => item.isCompleted,
          ).length;
          this.totalItems = this.task.checklistItems!.length;
        }
      }),
      this.store.select('user', 'user').subscribe((user) => {
        this.currentUser = user!.id;
      }),
    );
    this.isGettingCard = this.store.select('card', 'isGettingCard');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  }

  onClose() {
    this.dialogRef.close();
  }

  saveChanges() {
    this.dialogRef.close();
  }

  addTag() {}

  removeTag(tag: string) {}

  addSubtask() {
    if (this.newSubtask.trim()) {
      // Generate a unique ID to prevent potential conflicts
      const newId = Date.now().toString();

      this.task.checklistItems!.push({
        id: newId,
        title: this.newSubtask,
        isCompleted: false,
        createdAt: new Date(),
      });

      this.totalItems = this.task.checklistItems!.length;
      this.newSubtask = '';
    }
  }

  removeSubtask(id: string) {
    const subtask = this.task.checklistItems!.find((s) => s.id === id);
    if (!subtask) return;

    const wasCompleted = subtask.isCompleted;

    this.task.checklistItems = this.task.checklistItems!.filter(
      (s) => s.id !== id,
    );
  }

  toggleSubtask(completed: boolean) {
    // Recalculate completed count safely
  }

  getCompletionPercentage(): number {
    if (this.totalItems <= 0) return 0;
    return Math.min(100, (this.completedItems / this.totalItems) * 100);
  }

  addComment() {
    if (this.newComment.trim()) {
      const newComment: CommentModel = {
        text: this.newComment,
        createdAt: new Date(),
      };

      // this.comments.push(newComment);
      this.newComment = '';
    }
  }

  deleteComment(id: string) {
    // this.comments = this.comments.filter((c) => c.id !== id);
  }

  isCurrentUserAuthor(comment: CommentModel): boolean {
    return comment.userId === this.currentUser;
  }

  removeAssignee(memberId: string) {}

  openLabelDialog() {
    this.store.dispatch(labelActions.getLabelsInBoard({ id: this.boardId }));
  }
}
