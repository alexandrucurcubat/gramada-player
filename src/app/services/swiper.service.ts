import { Injectable } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Injectable({ providedIn: 'root' })
export class SwiperService {
  tabGroup!: MatTabGroup;
  selectedTab!: number;
  private swipeCoord!: [number, number];
  private swipeTime!: number;

  initTabGroup(tabGroup: MatTabGroup) {
    this.tabGroup = tabGroup;
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY,
    ];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [
        coord[0] - this.swipeCoord[0],
        coord[1] - this.swipeCoord[1],
      ];
      const duration = time - this.swipeTime;

      if (
        duration < 1000 &&
        Math.abs(direction[0]) > 30 &&
        Math.abs(direction[0]) > Math.abs(direction[1] * 3)
      ) {
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        switch (swipe) {
          case 'previous':
            if (this.selectedTab > 0) {
              this.selectedTab--;
            }
            break;
          case 'next':
            if (this.selectedTab < this.tabGroup._tabs.length - 1) {
              this.selectedTab++;
            }
            break;
        }
      }
    }
  }
}
