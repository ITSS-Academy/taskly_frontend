import {Component, ElementRef, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from '../../../../shared/modules/material.module';
import {
  NotificationsButtonComponent
} from '../../../../components/notifications-button/notifications-button.component';
import {LogoutButtonComponent} from '../../../../components/logout-button/logout-button.component';
import {Router} from '@angular/router';
import {BehaviorSubject, debounceTime, Subscription} from 'rxjs';
import * as boardActions from '../../../../ngrx/board/board.actions';
import {BoardState} from '../../../../ngrx/board/board.state';
import {Store} from '@ngrx/store';

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
export class HomeNavComponent implements OnInit {
  showSearchItems = false;

  searchSubject = new BehaviorSubject('');
  searchItems$ = this.searchSubject.asObservable();

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.searchItems$.pipe(
        debounceTime(500),
      ).subscribe((search) => {
        if (search) {
          this.store.dispatch(boardActions.searchBoards({search}));
        }
      }),
      this.store.select('board', 'searchedBoards').subscribe((searchResults) => {
        if (searchResults) {
          console.log('Search results:', searchResults);
          this.boardItems = searchResults;
          this.showSearchItems = true;
        }
      })
    );
  }

  boardItems!: any[];

  @ViewChild('searchContainer') searchContainer!: ElementRef;

  // Detect click outside the search container
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.searchContainer && !this.searchContainer.nativeElement.contains(event.target)) {
      this.showSearchItems = false;
    }
  }

  logoText: string = 'Home';

  constructor(private router: Router,
              private store: Store<{ board: BoardState }>) {
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

  search($event: Event) {
    const target = $event.target as HTMLInputElement;
    console.log('Searching for:', target.value);
    this.searchSubject.next(target.value);
  }
}
