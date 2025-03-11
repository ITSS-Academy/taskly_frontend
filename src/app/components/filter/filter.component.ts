import {Component, signal} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  members = signal<{
    id: string,
    name: string,
    photoUrl: string,
    isChecked: boolean
  } | null>(null);

  tags = signal(null);

  update(completed: boolean, index?: number) {

  }

  updateTags(completed: boolean, index?: number) {
   
  }
}
