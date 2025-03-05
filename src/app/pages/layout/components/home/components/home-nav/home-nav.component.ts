import {Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {MaterialModule} from '../../../../../../shared/modules/material.module';
import {
  NotificationsButtonComponent
} from '../../../../../../components/notifications-button/notifications-button.component';
import {LogoutButtonComponent} from '../../../../../../components/logout-button/logout-button.component';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [
    MaterialModule,
    NotificationsButtonComponent,
    LogoutButtonComponent
  ],
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.scss'
})
export class HomeNavComponent {
  showSearchItems = false;

  @ViewChild('searchContainer') searchContainer!: ElementRef;

  // Detect click outside the search container
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.searchContainer && !this.searchContainer.nativeElement.contains(event.target)) {
      this.showSearchItems = false;
    }
  }
}
