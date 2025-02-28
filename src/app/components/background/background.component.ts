import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {

}
