import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-video-dialog',
  templateUrl: './remove-video-dialog.component.html',
  styleUrls: ['./remove-video-dialog.component.scss'],
})
export class RemoveVideoDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
