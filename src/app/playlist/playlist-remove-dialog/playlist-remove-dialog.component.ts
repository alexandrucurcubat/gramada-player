import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-playlist-remove-dialog',
  templateUrl: './playlist-remove-dialog.component.html',
  styleUrls: ['./playlist-remove-dialog.component.scss'],
})
export class PlaylistDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
