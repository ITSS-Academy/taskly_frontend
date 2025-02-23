import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {MaterialModule} from "../../shared/modules/material.module";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  inputValue: string = "Board Name"; // Default text
  placeholder: string = "Board Name"; // Placeholder text
  isEditing: boolean = false;
  inputWidth: number = 12;

  @ViewChild('textInput', { static: false }) textInput!: ElementRef<HTMLInputElement>;
  @ViewChild('textMeasurer', { static: true }) textMeasurer!: ElementRef<HTMLSpanElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.adjustWidth();
  }

  enableEditing(): void {
    this.isEditing = true;

    this.cdr.detectChanges();
    setTimeout(() => {
      this.adjustWidth();
      this.textInput.nativeElement.focus();
      this.textInput.nativeElement.select();
    }, 0);
  }

  disableEditing(): void {
    this.isEditing = false;
  }

  adjustWidth(): void {
    if (this.textMeasurer) {
      this.textMeasurer.nativeElement.textContent = this.inputValue ? this.inputValue : '';
      this.inputWidth = this.textMeasurer.nativeElement.offsetWidth;
    }
  }
}
