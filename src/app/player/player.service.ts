import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Video } from '../models/video.interface';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private player: YouTubePlayer;
  private isReadySubject = new BehaviorSubject(false);
  private isPlayingSubject = new BehaviorSubject(false);
  private isMutedSubject = new BehaviorSubject(false);
  readonly isReady$: Observable<boolean> = this.isReadySubject.asObservable();
  readonly isPlaying$: Observable<boolean> =
    this.isPlayingSubject.asObservable();
  readonly isMuted$: Observable<boolean> = this.isMutedSubject.asObservable();
  readonly playingVideo$: Observable<Video | null>;
  playingVideo: Video;
  playlist: Video[];

  constructor(private playlistService: PlaylistService) {
    this.playingVideo$ = playlistService.playlist$.pipe(
      map((playlist: Video[]) => {
        this.playlist = playlist;
        if (playlist && playlist.length > 0) {
          const foundPlayingVideo = playlist.find((video) => video.isPlaying);
          if (foundPlayingVideo) {
            this.playingVideo = foundPlayingVideo;
            return this.playingVideo;
          } else {
            this.playlistService.setIsPlaying(true, playlist[0]);
            this.playingVideo = playlist[0];
            return this.playingVideo;
          }
        } else {
          return null;
        }
      })
    );
  }

  initPlayer(player: YouTubePlayer) {
    this.player = player;
    if (player) {
      player.ready.subscribe((ready) => {
        if (ready) this.isReadySubject.next(true);
      });
      if (player.ready) {
        player.stateChange.subscribe((state) => {
          switch (state.data) {
            case 0:
              this.isPlayingSubject.next(false);
              if (this.isAutoPlay()) {
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
        });
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

  skip() {
    if (this.playlist && this.playlist.length > 1) {
      this.playlistService.setIsPlaying(true, this.playlist[1]);
      this.playlistService.setIsPlaying(false, this.playlist[0]);
      this.playlistService.updateTimestamp(this.playlist[0]);
      this.playlistService.resetBoost(this.playlist[0]);
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

  setAutoPlay(auotPlay: boolean) {
    if (auotPlay) {
      localStorage.setItem('autoPlay', 'auto');
    } else {
      localStorage.setItem('autoPlay', 'manual');
    }
  }

  isAutoPlay() {
    const autoPlay = localStorage.getItem('autoPlay');
    return autoPlay === 'auto';
  }
}
