import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Video } from '../../models/video.interface';
import { PlayerService } from '../player.service';
import { PlaylistService } from '../../playlist/playlist.service';

@Component({
  selector: 'app-player-actions',
  templateUrl: './player-actions.component.html',
  styleUrls: ['./player-actions.component.scss'],
})
export class PlayerActionsComponent implements OnInit {
  isPlaying$: Observable<boolean>;
  isMuted$: Observable<boolean>;
  isReady$: Observable<boolean>;
  playlist$: Observable<Video[]>;
  isPlaylistEmpty$: Observable<boolean>;

  constructor(
    private playerService: PlayerService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.isPlaying$ = this.playerService.isPlaying$;
    this.isMuted$ = this.playerService.isMuted$;
    this.isReady$ = this.playerService.isReady$;
    this.playlist$ = this.playlistService.playlist$;
    this.isPlaylistEmpty$ = this.playlist$.pipe(
      map((videos) => !videos || videos.length === 0)
    );
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

  onSkip() {
    this.playerService.skip();
  }
}
