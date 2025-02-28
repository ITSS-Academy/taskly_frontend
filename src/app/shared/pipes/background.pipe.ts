import {Pipe, PipeTransform} from '@angular/core';
import {BackgroundService} from '../../services/background/background.service';
import {Observable} from 'rxjs';

@Pipe({
  name: 'background',
  standalone: true
})
export class BackgroundPipe implements PipeTransform {
  constructor(private backgroundService: BackgroundService) {
  }

  transform(id: string): Observable<string> {
    return this.backgroundService.getBackground(id);
  }

}
