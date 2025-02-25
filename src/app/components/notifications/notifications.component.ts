import { Component } from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})

export class NotificationsComponent {
  folders = [
    {
      name: 'Nguyen Dang Gia Tuong',
      updated: 'Nguyen Dang Gia Tuong has joined the board',
    },
    {
      name: 'List item',
      updated: '1/17/16',
    },
    {
      name: 'Tra My sent you a message',
      updated: 'Hi',
    },
    {
      name: 'Work',
      updated: '1/28/16',
    },
  ];
}
