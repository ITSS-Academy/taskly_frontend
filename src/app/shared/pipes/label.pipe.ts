import {Pipe, PipeTransform} from '@angular/core';
import {LabelService} from '../../services/label/label.service';

@Pipe({
  name: 'label',
  standalone: true
})
export class LabelPipe implements PipeTransform {
  constructor(private labelService: LabelService) {
  }

  transform(labelId: string) {
    return this.labelService.getLabel(labelId);
  }

}
