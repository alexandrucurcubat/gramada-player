import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  autoPlay: boolean;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.autoPlay = this.playerService.isAutoPlay();
  }

  onToggleAutoPlay() {
    this.playerService.setAutoPlay(!this.autoPlay);
  }
}
