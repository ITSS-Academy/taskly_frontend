import {Component, signal} from '@angular/core';
import {HomeNavComponent} from "../home/home-nav/home-nav.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {MaterialModule} from '../../shared/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [
    HomeNavComponent,
    SidebarComponent,
    NavbarComponent,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})
export class AllTaskComponent {
  displayedColumns: string[] = ['title', 'list', 'member', 'status', 'note'];
  dataSource = ELEMENT_DATA;
  readonly panelOpenState = signal(false);
  selected = 'option2';
}


export interface PeriodicElement {
  title: string;
  list: string;
  member: string;
  status: string;
  note: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},


];
