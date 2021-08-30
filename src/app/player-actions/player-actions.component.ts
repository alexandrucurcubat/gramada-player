import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PlayerService } from '../player/player.service';

type Video = {
  videoId: string;
  name: string;
  liked: boolean;
  votes: number;
};

@Component({
  selector: 'app-player-actions',
  templateUrl: './player-actions.component.html',
  styleUrls: ['./player-actions.component.scss'],
})
export class PlayerActionsComponent implements OnInit {
  isPlaying$: Observable<boolean>;
  isMuted$: Observable<boolean>;
  isReady$: Observable<boolean>;

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

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.isPlaying$ = this.playerService.isPlaying$;
    this.isMuted$ = this.playerService.isMuted$;
    this.isReady$ = this.playerService.isReady$;
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

  onChange() {
    this.playerService.change('JQOvsZ4eeOM');
  }
}
