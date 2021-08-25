import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule],
  exports: [MatTabsModule, MatIconModule],
})
export class MaterialModule {}
