import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MaterialModule} from '../../shared/modules/material.module';
import {NotificationsComponent} from '../notifications/notifications.component';
import {MatDialog} from '@angular/material/dialog';
import {BackgroundColorService} from '../../services/background-color/background-color.service';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-notifications-button',
  standalone: true,
  imports: [
    MaterialModule,
    NgStyle
  ],
  templateUrl: './notifications-button.component.html',
  styleUrl: './notifications-button.component.scss'
})
export class NotificationsButtonComponent implements OnInit {
  constructor(private backgroundColorService: BackgroundColorService) {
  }

  textColor: string = '#000000';
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(NotificationsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.backgroundColorService.textColor$.subscribe(color => {
      this.textColor = color;
    });
  }
}
