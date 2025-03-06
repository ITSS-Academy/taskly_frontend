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
    '#D5E8D4', '#FFF2CC', '#F8CECC', '#F5E1FD', '#E3D7FF',
    '#6DECB9', '#FFE599', '#FFAB91', '#FF8A80', '#B39DDB',
    '#1B5E20', '#996515', '#B71C1C', '#6A1B9A', '#303F9F',
    '#C5CAE9', '#B2EBF2', '#D7FCC9', '#F8BBD0', '#D6D6D6',
    '#64B5F6', '#81C784', '#AED581', '#FF80AB', '#9E9E9E',
    '#01579B', '#00838F', '#2E7D32', '#8E24AA', '#546E7A'
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
