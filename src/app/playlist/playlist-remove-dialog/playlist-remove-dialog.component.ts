import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Video } from 'src/app/models/video.interface';

@Component({
  selector: 'app-playlist-remove-dialog',
  templateUrl: './playlist-remove-dialog.component.html',
  styleUrls: ['./playlist-remove-dialog.component.scss'],
})
export class PlaylistRemoveDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Video) {}

  ngOnInit(): void {}
}
