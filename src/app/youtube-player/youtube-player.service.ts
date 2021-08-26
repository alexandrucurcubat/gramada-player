import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class YoutubePlayerService {
  private player!: YouTubePlayer;
  isPlayingSubject = new BehaviorSubject<boolean>(false);
  isMutedSubject = new BehaviorSubject<boolean>(false);
  isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  isMuted$: Observable<boolean> = this.isMutedSubject.asObservable();

  initPlayer(player: YouTubePlayer) {
    this.player = player;
    player.stateChange.subscribe((state) => {
      switch (state.data) {
        case 0:
          console.log('song finished');
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
