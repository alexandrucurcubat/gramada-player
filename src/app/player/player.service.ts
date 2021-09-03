import { Injectable, OnDestroy } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Video } from '../models/video.interface';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({ providedIn: 'root' })
export class PlayerService implements OnDestroy {
  private player: YouTubePlayer;
  private isReadySubject = new BehaviorSubject(false);
  private isPlayingSubject = new BehaviorSubject(false);
  private isMutedSubject = new BehaviorSubject(false);
  readonly isReady$: Observable<boolean> = this.isReadySubject.asObservable();
  readonly isPlaying$: Observable<boolean> =
    this.isPlayingSubject.asObservable();
  readonly isMuted$: Observable<boolean> = this.isMutedSubject.asObservable();
  readonly playingVideo$: Observable<Video | null>;
  private subscription = new Subscription();

  constructor(private playlistService: PlaylistService) {
    this.playingVideo$ = this.playlistService.playingVideo$;
  }

  initPlayer(player: YouTubePlayer) {
    this.player = player;
    if (player) {
      this.subscription.add(
        player.ready.subscribe((ready) => {
          if (ready) this.isReadySubject.next(true);
        })
      );
      if (player.ready) {
        this.subscription.add(
          player.stateChange.subscribe((state) => {
            switch (state.data) {
              case 0:
                this.isPlayingSubject.next(false);
                if (this.isAutoplay()) {
                  this.skip();
                }
                break;
              case 1:
                this.isPlayingSubject.next(true);
                break;
              case 2:
                this.isPlayingSubject.next(false);
                break;
              case 5:
                this.play();
                break;
              default:
                break;
            }
          })
        );
      }
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

  async skip() {
    await this.playlistService.skip();
    if (!this.isAutoplay()) {
      this.pause();
    }
  }

  mute() {
    this.player.mute();
    this.isMutedSubject.next(true);
  }

  unMute() {
    this.player.unMute();
    this.isMutedSubject.next(false);
  }

  setAutoplay(auotplay: boolean) {
    if (auotplay) {
      localStorage.setItem('autoplay', 'auto');
    } else {
      localStorage.setItem('autoplay', 'manual');
    }
  }

  isAutoplay() {
    const autoplay = localStorage.getItem('autoplay');
    return autoplay === 'auto';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
