import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class YoutubePlayerService {
  private player!: YouTubePlayer;

  initPlayer(player: YouTubePlayer) {
    this.player = player;
  }

  play() {
    this.player.playVideo();
  }

  pause() {
    this.player.pauseVideo();
  }

  change(videoId: string) {
    this.player.videoId = videoId;
    this.play();
  }
}
