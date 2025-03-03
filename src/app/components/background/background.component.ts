import {Component, ElementRef, ViewChild} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {BackgroundColorService} from '../../services/background-color/background-color.service';
import {FormsModule} from '@angular/forms';
import {BoardModel} from '../../models/board.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import * as boardActions from '../../ngrx/board/board.actions';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {
  @ViewChild('previewImage', {static: false}) previewImage!: ElementRef<HTMLImageElement>;

  constructor(
    private backgroundColorService: BackgroundColorService,
    private dialogRef: MatDialogRef<BackgroundComponent>,// Inject MatDialogRef
    private store: Store<{ auth: AuthState }>,
    private storeBoard: Store<{ board: BoardModel }>
  ) {
  }

  colorBackgrounds = ['#D3D3D3', '#A8E6CF', '#377D6A', '#1D4F73'];

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.backgroundColorService.setBackgroundImage(imageUrl); // ✅ Update the home background image
        setTimeout(() => {
          this.extractPrimaryColor(imageUrl);
          this.dialogRef.close(); // ✅ Auto-close the dialog
        }, 100);
      };

      reader.readAsDataURL(file);
    }
  }

  extractPrimaryColor(imageUrl: string): void {
    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = "Anonymous";

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < imageData.length; i += 4 * 100) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      const primaryColor = `rgb(${r}, ${g}, ${b})`;
      console.log('Extracted Sidebar Color:', primaryColor);

      this.backgroundColorService.setSidebarColor(primaryColor);
      this.backgroundColorService.setNavbarTextColor(primaryColor);
    };
  }


}
