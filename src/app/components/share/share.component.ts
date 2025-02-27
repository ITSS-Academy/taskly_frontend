import {Component, inject} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NotificationsComponent} from '../notifications/notifications.component';


@Component({
  selector: 'app-share',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
  ],
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss'
})
export class ShareComponent {
  users = [
    {
      name: "Trinh Tu Hao",
      email: "hhaoz@gmail.com",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s"
    },
    {
      name: "Nguyen Van A",
      email: "nguyenvana@example.com",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Le Thi B",
      email: "lethib@example.com",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Pham Minh C",
      email: "phamminhc@example.com",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      name: "Hoang Duy D",
      email: "hoangduyd@example.com",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    }
  ];

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(ShareComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
