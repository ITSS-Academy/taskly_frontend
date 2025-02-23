import {Component, ViewChild} from '@angular/core';
import {MaterialModule} from "../../shared/modules/material.module";
import {MatSidenav} from "@angular/material/sidenav";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  boards = [
    {
      name: 'Work',
      background:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVza3RvcHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      name: 'Personal',
      background:
        'https://media.istockphoto.com/id/1285308242/photo/to-do-list-text-on-notepad.jpg?s=612x612&w=0&k=20&c=p85bCVQZwvkrqqqNOJGg2QuPDu6ynTlQHkASQOTELh8=',
    },
  ];

  invitedBoards = [
    {
      name: 'Trip to Japan',
      background:
        'https://t3.ftcdn.net/jpg/05/13/59/72/360_F_513597277_YYqrogAmgRR9ohwTUnOM784zS9eYUcSk.jpg',
    },
  ];
}
