import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

import { SwiperService } from './services/swiper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  selectedTab!: number;

  videoId = 'Kd5BWEuqf1s';

  constructor(private swiperService: SwiperService) {}

  ngAfterViewInit() {
    this.swiperService.initTabGroup(this.tabGroup);
  }

  onSwipe(event: TouchEvent, when: string) {
    this.swiperService.swipe(event, when);
  }
}
