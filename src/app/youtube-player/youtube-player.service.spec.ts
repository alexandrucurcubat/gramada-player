import { TestBed } from '@angular/core/testing';

import { YoutubePlayerService } from './youtube-player.service';

describe('YoutubePlayerService', () => {
  let service: YoutubePlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubePlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
