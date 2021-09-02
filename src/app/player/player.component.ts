import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Observable, Subscription } from 'rxjs';

import { PlayerService } from './player.service';
import { Video } from '../models/video.interface';

let apiLoaded = false;
const DEFAULT_PLAYER_WIDTH = 640;
const DEFAULT_PLAYER_HEIGHT = 390;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('player') player: YouTubePlayer;
  innerWidth = DEFAULT_PLAYER_WIDTH;
  innerHeight = DEFAULT_PLAYER_HEIGHT;
  isReady$: Observable<boolean>;
  playingVideoId: string;
  private subscription = new Subscription();

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.setPlayerSize();
    if (!apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
    this.isReady$ = this.playerService.isReady$;
    this.subscription.add(
      this.playerService.playingVideo$.subscribe((video: Video | null) => {
        if (video) this.playingVideoId = video.videoId;
      })
    );
  }

  ngAfterViewInit(): void {
    this.playerService.initPlayer(this.player);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setPlayerSize();
  }

  private setPlayerSize() {
    this.innerWidth = window.innerWidth;
    if (window.innerWidth > DEFAULT_PLAYER_WIDTH) {
      this.innerWidth = DEFAULT_PLAYER_WIDTH;
    }
    this.innerHeight = window.innerWidth / 1.66;
    if (this.innerHeight > DEFAULT_PLAYER_HEIGHT) {
      this.innerHeight = DEFAULT_PLAYER_HEIGHT;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
