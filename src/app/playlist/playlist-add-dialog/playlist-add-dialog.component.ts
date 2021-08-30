import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-playlist-add-dialog',
  templateUrl: './playlist-add-dialog.component.html',
  styleUrls: ['./playlist-add-dialog.component.scss'],
})
export class PlaylistAddDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
