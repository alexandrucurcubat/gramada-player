import { Component, OnInit } from '@angular/core';
import { YoutubePlayerService } from '../youtube-player/youtube-player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  constructor(private playerService: YoutubePlayerService) {}

  ngOnInit(): void {}

  onPlay() {
    this.playerService.play();
  }

  onPause() {
    this.playerService.pause();
  }

  onChange() {
    this.playerService.change('gj7vbHtuU00')
  }
}
