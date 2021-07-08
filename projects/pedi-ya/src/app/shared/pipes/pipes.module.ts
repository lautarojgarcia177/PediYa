import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { UpperCasePipe } from '../pipes/uppercase/uppercase.pipe';

@NgModule({
  declarations: [
    UpperCasePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UpperCasePipe,
  ],
})

export class PipesModule { }