import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MaterialModule } from '../../shared/modules/material.module';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';
import { BackgroundColorService } from '../../services/background-color/background-color.service';
import { NgStyle } from '@angular/common';
import { Store } from '@ngrx/store';
import { NotificationsState } from '../../ngrx/notifications/notifications.state';
import * as notificationsActions from '../../ngrx/notifications/notifications.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications-button',
  standalone: true,
  imports: [MaterialModule, NgStyle],
  templateUrl: './notifications-button.component.html',
  styleUrl: './notifications-button.component.scss',
})
export class NotificationsButtonComponent implements OnInit {
  constructor(
    private backgroundColorService: BackgroundColorService,
    private store: Store<{
      notifications: NotificationsState;
    }>,
  ) {
    this.store.dispatch(notificationsActions.checkNewNotifications());
  }

  textColor: string = '#000000';
  readonly dialog = inject(MatDialog);
  subcriptions: Subscription[] = [];
  isNotifications!: boolean;

  openDialog() {
    const dialogRef = this.dialog.open(NotificationsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.store.dispatch(notificationsActions.clearNotifications());
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.backgroundColorService.textColor$.subscribe((color) => {
      this.textColor = color;
    });

    this.subcriptions.push(
      this.store
        .select('notifications', 'isNewNotifications')
        .subscribe((newNotifications) => {
          this.isNotifications = newNotifications;
        }),
    );
  }
}
