import {Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {MaterialModule} from '../../../../shared/modules/material.module';
import {
  NotificationsButtonComponent
} from '../../../../components/notifications-button/notifications-button.component';
import {LogoutButtonComponent} from '../../../../components/logout-button/logout-button.component';
import {Router} from '@angular/router';

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

  logoText: string = 'Home';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.updateLogoText();
    });
  }

  updateLogoText() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/alltasks')) {
      this.logoText = 'All Task';
    } else {
      this.logoText = 'Home';
    }
  }
}
