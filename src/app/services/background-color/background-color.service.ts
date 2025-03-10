import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundColorService {
  private logoImageSource = new BehaviorSubject<string>("/assets/images/logo-black.png");
  private sidebarColorSource = new BehaviorSubject<string>('#F5FFF8'); // Default: White
  private textColorSource = new BehaviorSubject<string>('#000000'); // Default: Black
  private backgroundImageSource = new BehaviorSubject<string | null>(null);

  logoImage$ = this.logoImageSource.asObservable();
  sidebarColor$ = this.sidebarColorSource.asObservable();
  textColor$ = this.textColorSource.asObservable();
  backgroundImage$ = this.backgroundImageSource.asObservable();

  private readonly defaultLogo = "/assets/images/logo-primary.png";
  private readonly blackLogo = "./assets/images/logo-black.png";
  private readonly whiteLogo = "/assets/images/logo-white.png";

  setLogo(color: string): void {
    const logoImage = this.getContrastingColor(color) === '#ffffff' ? this.whiteLogo : this.blackLogo;
    this.logoImageSource.next(logoImage);
    console.log('Logo Image:', logoImage);
  }

  setNavbarTextColor(color: string): void {
    const textColor = this.getContrastingColor(color);
    this.textColorSource.next(textColor);
  }

  setSidebarColor(color: string): void {
    this.sidebarColorSource.next(color);

    // Determine the best text color for contrast
    const textColor = this.getContrastingColor(color);
    console.log(color)
    console.log('Sidebar Text Color:', textColor);
    this.textColorSource.next(textColor);
  }

  setBackgroundImage(imageUrl: string): void {
    console.log('Background Image:', imageUrl);
    this.backgroundImageSource.next(imageUrl);
  }

  private getContrastingColor(rgbColor: string): string {
    const rgbValues = rgbColor.match(/\d+/g);
    if (!rgbValues) return '#F5FFF8';

    const r = parseInt(rgbValues[0], 10);
    const g = parseInt(rgbValues[1], 10);
    const b = parseInt(rgbValues[2], 10);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}
