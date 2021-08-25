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
import { YoutubePlayerService } from './youtube-player.service';

let apiLoaded = false;
const DEFAULT_PLAYER_WIDTH = 640;
const DEFAULT_PLAYER_HEIGHT = 390;

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubePlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('player') player!: YouTubePlayer;
  @Input() videoId!: string;
  innerWidth = DEFAULT_PLAYER_WIDTH;
  innerHeight = DEFAULT_PLAYER_HEIGHT;

  constructor(private youtubePlayerService: YoutubePlayerService) {}

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
    this.youtubePlayerService.initPlayer(this.player);
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