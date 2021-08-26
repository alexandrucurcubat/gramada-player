import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
  ],
})
export class MaterialModule {}
