import { Component } from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {HomeNavComponent} from "./home-nav/home-nav.component";
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    HomeNavComponent,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isSlideBarVisible = false;

  onLinkActivated(): void {
    this.isSlideBarVisible = false;
  }
}
