import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { YoutubePlayerService } from '../youtube-player/youtube-player.service';
import { RemoveVideoDialogComponent } from './remove-video-dialog/remove-video-dialog.component';

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
  constructor(
    private playerService: YoutubePlayerService,
    public dialog: MatDialog
  ) {}

  isPlaying$!: Observable<boolean>;
  isMuted$!: Observable<boolean>;

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

  ngOnInit(): void {
    this.isPlaying$ = this.playerService.isPlaying$;
    this.isMuted$ = this.playerService.isMuted$;
  }

  onPlay() {
    this.playerService.play();
  }

  onPause() {
    this.playerService.pause();
  }

  onMute() {
    this.playerService.mute();
  }

  onUnMute() {
    this.playerService.unMute();
  }

  onRemove(videoName: string) {
    const dialogRef = this.dialog.open(RemoveVideoDialogComponent, {
      data: { videoName },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('remove video', result);
    });
  }
}
