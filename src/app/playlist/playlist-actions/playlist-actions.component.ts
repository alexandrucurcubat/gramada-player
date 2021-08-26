import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { YoutubePlayerService } from '../../youtube-player/youtube-player.service';

type Video = {
  videoId: string;
  name: string;
  liked: boolean;
  votes: number;
};

@Component({
  selector: 'app-playlist-actions',
  templateUrl: './playlist-actions.component.html',
  styleUrls: ['./playlist-actions.component.scss'],
})
export class PlaylistActionsComponent implements OnInit {
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

  constructor(private playerService: YoutubePlayerService) {}

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
}
