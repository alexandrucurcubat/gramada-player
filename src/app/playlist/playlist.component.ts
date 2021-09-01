import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { PlaylistRemoveDialogComponent } from './playlist-remove-dialog/playlist-remove-dialog.component';
import { PlaylistService } from './playlist.service';
import { Video } from '../models/video.interface';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  isPlaying$: Observable<boolean>;
  isMuted$: Observable<boolean>;
  playlist$: Observable<Video[]>;

  constructor(
    private dialog: MatDialog,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.playlist$ = this.playlistService.playlist$;
  }

  onRemove(video: Video) {
    const dialogRef = this.dialog.open(PlaylistRemoveDialogComponent, {
      data: { title: video.title },
    });
    dialogRef.afterClosed().subscribe((canRemove: boolean) => {
      if (canRemove) {
        this.playlistService.remove(video);
      }
    });
  }
}
