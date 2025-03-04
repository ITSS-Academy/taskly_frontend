import {Component, inject} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-share-snackbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './share-snackbar.component.html',
  styleUrl: './share-snackbar.component.scss'
})
export class ShareSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
