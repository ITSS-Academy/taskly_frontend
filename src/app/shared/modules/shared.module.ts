import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForDirective } from '../for.directive';

@NgModule({
  declarations: [],
  imports: [CommonModule, ForDirective],
  exports: [ForDirective]
})
export class SharedModule {}
