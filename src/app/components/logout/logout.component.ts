import {Component} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

}
