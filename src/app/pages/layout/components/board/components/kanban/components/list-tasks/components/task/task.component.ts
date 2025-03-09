import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, DatePipe, NgIf, NgStyle } from '@angular/common';
import { BehaviorSubject, forkJoin, of, Subscription } from 'rxjs';
import { MatIconButton } from '@angular/material/button';
import { CardModel } from '../../../../../../../../../../models/card.model';
import { BoardState } from '../../../../../../../../../../ngrx/board/board.state';
import { Store } from '@ngrx/store';
import { ListState } from '../../../../../../../../../../ngrx/list/list.state';
import * as listActions from '../../../../../../../../../../ngrx/list/list.actions';
import { MatDialog } from '@angular/material/dialog';
import { TaskDescriptionComponent } from '../../../../../../../../../../components/task-description/task-description.component';
import { LabelPipe } from '../../../../../../../../../../shared/pipes/label.pipe';
import { UserPipe } from '../../../../../../../../../../shared/pipes/user.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { ListCard } from '../../../../../../../../../../models/list.model';
import * as cardActions from '../../../../../../../../../../ngrx/card/card.actions';
import { CardState } from '../../../../../../../../../../ngrx/card/card.state';
import { LabelService } from '../../../../../../../../../../services/label/label.service';
import { LabelModel } from '../../../../../../../../../../models/label.model';
import { ChecklistItemModel } from '../../../../../../../../../../models/checklistItem.model';
import { MaterialModule } from '../../../../../../../../../../shared/modules/material.module';

interface Task {
  id: string;
  title: string;
  description: string;
  assignees: string[];
  date: Date;
  progress: number;
  totalSubtasks: number;
  completedSubtasks: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [DatePipe, LabelPipe, AsyncPipe, UserPipe, NgStyle, MaterialModule],
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  private taskSubject = new BehaviorSubject<ListCard | null>(null);
  task$ = this.taskSubject.asObservable();

  taskId!: string;

  @Input() set task(value: ListCard) {
    this.taskId = value.id!;
    this.taskSubject.next(value);
  }

  readonly dialog = inject(MatDialog);
  subscription: Subscription[] = [];

  constructor(
    private store: Store<{
      board: BoardState;
      list: ListState;
      card: CardState;
    }>,
  ) {}

  completedSubtasks!: number;
  totalSubtasks!: number;

  ngOnInit() {
    this.subscription.push(
      this.task$.subscribe((task) => {
        if (task) {
          this.totalSubtasks = task.checklistItems
            ? task.checklistItems.length
            : 0;
          this.completedSubtasks = task.checklistItems
            ? task.checklistItems.filter(
                (subtask) => subtask.isCompleted === true,
              ).length
            : 0;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.subscription = [];
  }

  closeTask() {
    // Implement logic to remove/archive task
    console.log('Closing task:', this.taskId);
    this.store.dispatch(listActions.deleteCard({ cardId: this.taskId! }));
  }

  // getProgressColor() {
  //   if (this.task.progress < 34) {
  //     return '#FFA726'; // Orange for low progress
  //   } else if (this.task.progress < 67) {
  //     return '#26A69A'; // Teal for medium progress
  //   } else {
  //     return '#66BB6A'; // Green for high progress
  //   }
  // }

  protected readonly of = of;

  openDialog() {
    this.dialog.open(TaskDescriptionComponent, {
      data: this.taskId,
    });
  }

  getContrastTextColor(hexColor: string) {
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    return brightness > 186 ? '#000000' : '#FFFFFF';
  }

  showMoreOptions() {}

  protected readonly Array = Array;
}
