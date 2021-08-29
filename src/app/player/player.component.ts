import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

import { PlayerService } from './player.service';

let apiLoaded = false;
const DEFAULT_PLAYER_WIDTH = 640;
const DEFAULT_PLAYER_HEIGHT = 390;

@Component({
  selector: 'app-youtube-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('player') player: YouTubePlayer;
  @Input() videoId: string;
  innerWidth = DEFAULT_PLAYER_WIDTH;
  innerHeight = DEFAULT_PLAYER_HEIGHT;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    if (!apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
    this.setPlayerSize();
  }

  ngAfterViewInit(): void {
    this.playerService.initPlayer(this.player);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setPlayerSize();
  }

  setPlayerSize() {
    this.innerWidth = window.innerWidth;
    if (window.innerWidth > DEFAULT_PLAYER_WIDTH) {
      this.innerWidth = DEFAULT_PLAYER_WIDTH;
    }
    this.innerHeight = window.innerWidth / 1.66;
    if (this.innerHeight > DEFAULT_PLAYER_HEIGHT) {
      this.innerHeight = DEFAULT_PLAYER_HEIGHT;
    }
  }
}
