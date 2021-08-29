import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private player: YouTubePlayer;
  private isReadySubject = new BehaviorSubject(false);
  private isPlayingSubject = new BehaviorSubject(false);
  private isMutedSubject = new BehaviorSubject(false);
  readonly isReady$: Observable<boolean> = this.isReadySubject.asObservable();
  readonly isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  readonly isMuted$: Observable<boolean> = this.isMutedSubject.asObservable();
  isAutoPlay = false; // save in localstorage

  initPlayer(player: YouTubePlayer) {
    this.player = player;
    player.ready.subscribe((ready) => {
      if (ready) this.isReadySubject.next(true);
    });
    if (player.ready) {
      player.stateChange.subscribe((state) => {
        switch (state.data) {
          case 0:
            this.isPlayingSubject.next(false);
            if (this.isAutoPlay) {
              // this.change()
            }
            break;
          case 1:
            this.isPlayingSubject.next(true);
            break;
          case 2:
            this.isPlayingSubject.next(false);
            break;
          default:
            break;
        }
      });
    }
  }

  play() {
    this.player.playVideo();
    this.isPlayingSubject.next(true);
  }

  pause() {
    this.player.pauseVideo();
    this.isPlayingSubject.next(false);
  }

  stop() {
    this.player.stopVideo();
  }

  change(videoId: string) {
    this.player.videoId = videoId;
    this.play();
  }

  mute() {
    this.player.mute();
    this.isMutedSubject.next(true);
  }

  unMute() {
    this.player.unMute();
    this.isMutedSubject.next(false);
  }
}
