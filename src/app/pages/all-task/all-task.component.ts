import { Component } from '@angular/core';
import {HomeNavComponent} from "../home/home-nav/home-nav.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {ShareComponent} from '../../components/share/share.component';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [
    HomeNavComponent,
    SidebarComponent,
    NavbarComponent,
    ShareComponent
  ],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})
export class AllTaskComponent {

}
