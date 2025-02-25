import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MaterialModule} from '../../shared/modules/material.module';
import {NotificationsComponent} from '../notifications/notifications.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-notifications-button',
  standalone: true,
    imports: [
        MaterialModule
    ],
  templateUrl: './notifications-button.component.html',
  styleUrl: './notifications-button.component.scss'
})
export class NotificationsButtonComponent {
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(NotificationsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
