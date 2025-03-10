import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Store} from '@ngrx/store';
import {LabelState} from '../../ngrx/label/label.state';
import * as labelActions from '../../ngrx/label/label.actions';
import {BoardState} from '../../ngrx/board/board.state';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShareSnackbarComponent} from '../share-snackbar/share-snackbar.component';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-label-list',
  templateUrl: 'label-list.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatButton,
    ReactiveFormsModule,
    MaterialModule
  ],
  styleUrls: ['./label-list.component.scss']
})
export class LabelListComponent implements OnInit, OnDestroy {
  createLabelForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    color: new FormControl('', [Validators.required])
  });

  private _snackBar = inject(MatSnackBar);


  colors: string[] = [
    '#D5E8D4', '#FFF2CC', '#F8CECC', '#F5E1FD', '#C5CAE9',
    '#A8D5A0', '#FFE599', '#FFAB91', '#E1BEE7', '#90CAF9',
    '#81C784', '#FFD54F', '#FF8A80', '#CE93D8', '#64B5F6',
    '#B2EBF2', '#FFCCBC', '#F8BBD0', '#D6D6D6', '#80CBC4',
    '#80DEEA', '#FFAB91', '#F48FB1', '#BDBDBD', '#4DB6AC',
    '#4DD0E1', '#FF8A65', '#F06292', '#9E9E9E', '#26A69A'
  ];

  boardId!: string;
  subscriptions: Subscription[] = [];

  constructor(private dialogRef: MatDialogRef<LabelListComponent>,
              private store: Store<{
                label: LabelState,
                board: BoardState
              }>) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.boardId = board.id!;
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  selectColor(color: string) {
    this.createLabelForm.get('color')?.setValue(color);
  }

  removeColor() {
    this.createLabelForm.get('color')?.setValue('');
  }

  createLabel() {
    if (this.createLabelForm.valid) {
      const label = this.createLabelForm.get('title')?.value;
      const color = this.createLabelForm.get('color')?.value;

      this.store.dispatch(labelActions.createLabel({
        label: {
          name: label,
          color: color,
          boardId: this.boardId
        }
      }));
      // console.log("Tạo nhãn:", {title: label, color: color});
      this.dialogRef.close();
    } else {
      this._snackBar.openFromComponent(ShareSnackbarComponent, {
        data: "Please fill in the form",
      })
    }
  }

  close() {
    this.dialogRef.close();
  }
}
