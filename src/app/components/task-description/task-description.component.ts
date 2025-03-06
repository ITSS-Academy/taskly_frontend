import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material.module';
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
    TextFieldModule
  ],
  templateUrl: './task-description.component.html',
  styleUrl: './task-description.component.scss'
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

  // Mock data for development
  subtasks: Subtask[] = [];
  comments: Comment[] = [];
  currentUser = 'Current User';

  constructor() {
    // Create a copy of the task that we can modify
    this.taskCopy = { ...this.originalTask };

    // Initialize subtasks from task data or with mock data
    if (!this.originalTask.subtasks) {
      this.subtasks = [
        { id: '1', title: 'Design UI mockups', completed: true },
        { id: '2', title: 'Implement frontend components', completed: true }
      ];
    } else {
      this.subtasks = [...this.originalTask.subtasks];
    }

    this.comments = [
      {
        id: '1',
        author: 'John Doe',
        content: 'Let\'s focus on improving the user experience in this iteration.',
        date: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: '2',
        author: this.currentUser,
        content: 'I\'ve started working on the UI components. Will update progress soon.',
        date: new Date()
      }
    ];

    // Initialize task properties on the copy
    this.taskCopy.completedSubtasks = this.subtasks.filter(s => s.completed).length;
    this.taskCopy.totalSubtasks = this.subtasks.length;
    this.taskCopy.assignees = this.originalTask.assignees ? [...this.originalTask.assignees] : ['John Doe'];
  }

  onClose() {
    this.dialogRef.close();
  }

  saveChanges() {
    // Update task copy with new data
    this.taskCopy.subtasks = this.subtasks;
    this.taskCopy.comments = this.comments;
    this.taskCopy.completedSubtasks = this.subtasks.filter(s => s.completed).length;
    this.taskCopy.totalSubtasks = this.subtasks.length;

    this.taskChange.emit(this.taskCopy);
    this.dialogRef.close(this.taskCopy);
  }

  addTag() {
    if (this.newTag.trim() && !this.taskCopy.tags?.includes(this.newTag.trim())) {
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
      const newId = (this.subtasks.length + 1).toString();

      this.subtasks.push({
        id: newId,
        title: this.newSubtask,
        completed: false
      });

      this.taskCopy.totalSubtasks = this.subtasks.length;
      this.newSubtask = '';
    }
  }

  removeSubtask(id: string) {
    const wasCompleted = this.subtasks.find(s => s.id === id)?.completed;
    this.subtasks = this.subtasks.filter(s => s.id !== id);

    if (wasCompleted) {
      this.taskCopy.completedSubtasks--;
    }

    this.taskCopy.totalSubtasks = this.subtasks.length;
  }

  toggleSubtask(completed: boolean) {
    // Recalculate completed count
    this.taskCopy.completedSubtasks = this.subtasks.filter(s => s.completed).length;
  }

  getCompletionPercentage(): number {
    if (!this.taskCopy.totalSubtasks) return 0;
    return (this.taskCopy.completedSubtasks / this.taskCopy.totalSubtasks) * 100;
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({
        id: Date.now().toString(),
        author: this.currentUser,
        content: this.newComment,
        date: new Date()
      });

      this.newComment = '';
    }
  }

  deleteComment(id: string) {
    this.comments = this.comments.filter(c => c.id !== id);
  }

  isCurrentUserAuthor(comment: Comment): boolean {
    return comment.author === this.currentUser;
  }

  removeAssignee(assignee: string) {
    if (this.taskCopy.assignees) {
      this.taskCopy.assignees = this.taskCopy.assignees.filter((a: string) => a !== assignee);
    }
  }
}
