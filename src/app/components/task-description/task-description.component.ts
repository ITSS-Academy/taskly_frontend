import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material.module';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextFieldModule } from '@angular/cdk/text-field';

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: Date;
}

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
  ],
  templateUrl: 'task-description.component.html',
  styleUrl: './task-description.component.scss',
})
export class TaskDescriptionComponent {
  @Output() taskChange = new EventEmitter<any>();

  newTag = '';
  newSubtask = '';
  newComment = '';
  tagInputFocused = false;
  showAssigneeSelector = false;

  // Create a local task copy that we can modify
  taskCopy: any;

  readonly dialogRef = inject(MatDialogRef<TaskDescriptionComponent>);
  private readonly originalTask = inject<any>(MAT_DIALOG_DATA);

  // Data for tasks
  subtasks: Subtask[] = [];
  comments: Comment[] = [];
  currentUser = 'Current User';

  readonly dialog = inject(MatDialog);

  // Flag to determine if this is a new task
  private isNewTask: boolean;

  constructor() {
    // Determine if this is a new task based on id
    this.isNewTask = !this.originalTask.id;

    // Create a copy of the task that we can modify
    this.taskCopy = { ...this.originalTask };

    // Initialize subtasks from task data or with empty array for new tasks
    if (this.originalTask.subtasks && Array.isArray(this.originalTask.subtasks)) {
      this.subtasks = [...this.originalTask.subtasks];
    } else if (this.isNewTask) {
      // Empty array for new tasks
      this.subtasks = [];
    } else {
      // Default subtasks for existing tasks that don't have any yet
      this.subtasks = [
        { id: '1', title: 'Design UI mockups', completed: true },
        { id: '2', title: 'Implement frontend components', completed: false },
      ];
    }

    // Initialize comments with existing data or defaults
    if (this.originalTask.comments && Array.isArray(this.originalTask.comments)) {
      this.comments = [...this.originalTask.comments];
    } else {
      // Use sample comments only for non-new tasks without comments
      this.comments = this.isNewTask ? [] : [
        {
          id: '1',
          author: 'John Doe',
          content: "Let's focus on improving the user experience in this iteration.",
          date: new Date(Date.now() - 86400000), // 1 day ago
        },
        {
          id: '2',
          author: this.currentUser,
          content: "I've started working on the UI components. Will update progress soon.",
          date: new Date(),
        },
      ];
    }

    // Initialize task properties on the copy
    this.taskCopy.completedSubtasks = this.subtasks.filter(
      (s) => s.completed
    ).length;
    this.taskCopy.totalSubtasks = this.subtasks.length;

    // Use members array for assignees if available, otherwise use assignees
    if (this.originalTask.members && Array.isArray(this.originalTask.members)) {
      this.taskCopy.assignees = this.originalTask.members.map((m: any) =>
        m.name || m.user_id || m
      );
    } else if (this.originalTask.assignees) {
      this.taskCopy.assignees = [...this.originalTask.assignees];
    } else {
      this.taskCopy.assignees = this.isNewTask ? [] : ['John Doe'];
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  saveChanges() {
    // Update task copy with new data
    this.taskCopy.subtasks = this.subtasks;
    this.taskCopy.comments = this.comments;
    this.taskCopy.completedSubtasks = this.subtasks.filter(
      (s) => s.completed
    ).length;
    this.taskCopy.totalSubtasks = this.subtasks.length;

    // Make sure we maintain the interface expected by the backend
    if (this.originalTask.members && !this.taskCopy.members) {
      // Convert assignees to members format if needed
      this.taskCopy.members = this.taskCopy.assignees.map((a: string) => {
        return { user_id: a };
      });
    }

    this.taskChange.emit(this.taskCopy);
    this.dialogRef.close(this.taskCopy);
  }

  addTag() {
    if (
      this.newTag.trim() &&
      !this.taskCopy.tags?.includes(this.newTag.trim())
    ) {
      if (!this.taskCopy.tags) {
        this.taskCopy.tags = [];
      }
      this.taskCopy.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    if (this.taskCopy.tags) {
      this.taskCopy.tags = this.taskCopy.tags.filter((t: string) => t !== tag);
    }
  }

  addSubtask() {
    if (this.newSubtask.trim()) {
      // Generate a unique ID to prevent potential conflicts
      const newId = Date.now().toString();

      this.subtasks.push({
        id: newId,
        title: this.newSubtask,
        completed: false,
      });

      this.taskCopy.totalSubtasks = this.subtasks.length;
      this.newSubtask = '';
    }
  }

  removeSubtask(id: string) {
    const subtask = this.subtasks.find((s) => s.id === id);
    if (!subtask) return;

    const wasCompleted = subtask.completed;
    this.subtasks = this.subtasks.filter((s) => s.id !== id);

    // Update completion count if a completed subtask was removed
    if (wasCompleted) {
      this.taskCopy.completedSubtasks = Math.max(0, this.taskCopy.completedSubtasks - 1);
    }

    this.taskCopy.totalSubtasks = this.subtasks.length;
  }

  toggleSubtask(completed: boolean) {
    // Recalculate completed count safely
    this.taskCopy.completedSubtasks = this.subtasks.filter(
      (s) => s.completed
    ).length;
  }

  getCompletionPercentage(): number {
    if (!this.taskCopy.totalSubtasks || this.taskCopy.totalSubtasks <= 0) return 0;
    return Math.min(100, (this.taskCopy.completedSubtasks / this.taskCopy.totalSubtasks) * 100);
  }

  addComment() {
    if (this.newComment.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: this.currentUser,
        content: this.newComment,
        date: new Date(),
      };

      this.comments.push(newComment);
      this.newComment = '';
    }
  }

  deleteComment(id: string) {
    this.comments = this.comments.filter((c) => c.id !== id);
  }

  isCurrentUserAuthor(comment: Comment): boolean {
    return comment.author === this.currentUser;
  }

  removeAssignee(assignee: string) {
    if (this.taskCopy.assignees) {
      this.taskCopy.assignees = this.taskCopy.assignees.filter(
        (a: string) => a !== assignee
      );
    }
  }

  addAssignee(assignee: string) {
    if (!assignee.trim()) return;

    if (!this.taskCopy.assignees) {
      this.taskCopy.assignees = [];
    }

    if (!this.taskCopy.assignees.includes(assignee)) {
      this.taskCopy.assignees.push(assignee);
    }

    this.showAssigneeSelector = false;
  }

  openLabelDialog() {
    const dialogRef = this.dialog.open(LabelDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the selected label
        this.addLabelToTask(result);
      }
    });
  }

  createLabel() {
    const dialogRef = this.dialog.open(LabelDialogComponent, {
      width: '400px',
      data: { isCreating: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the newly created label to the task
        this.addLabelToTask(result);
      }
    });
  }

  private addLabelToTask(label: any) {
    if (!this.taskCopy.labels) {
      this.taskCopy.labels = [];
    }

    // Check if label is already on the task
    const labelExists = this.taskCopy.labels.some((l: any) =>
      (l.id && l.id === label.id) ||
      (l.boardLabelId && l.boardLabelId === label.id)
    );

    if (!labelExists) {
      this.taskCopy.labels.push({
        boardLabelId: label.id,
        name: label.name,
        color: label.color
      });
    }
  }
}
