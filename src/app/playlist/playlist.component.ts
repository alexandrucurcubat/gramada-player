import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { PlaylistRemoveDialogComponent } from './playlist-remove-dialog/playlist-remove-dialog.component';

type Video = {
  videoId: string;
  name: string;
  liked: boolean;
  votes: number;
};

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  isPlaying$: Observable<boolean>;
  isMuted$: Observable<boolean>;

  playlist: Video[] = [
    {
      videoId: 'Kd5BWEuqf1s',
      name: 'MCC - FEBRUARY FULL MOON LIVE SESSION 2019',
      votes: 3,
      liked: true,
    },
    {
      videoId: 'JQOvsZ4eeOM',
      name: 'Magna Carta Cartel - Turn',
      votes: 0,
      liked: false,
    },
    {
      videoId: 'IxkbHhTHnLI',
      name: 'Magna Carta Cartel - Sway',
      votes: 0,
      liked: false,
    },
    {
      videoId: 'gj7vbHtuU00',
      name: 'Magna Carta Cartel - Sleepy Eye June',
      votes: 0,
      liked: false,
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onRemove(videoName: string) {
    const dialogRef = this.dialog.open(PlaylistRemoveDialogComponent, {
      data: { videoName },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('remove video', result);
    });
  }
}
