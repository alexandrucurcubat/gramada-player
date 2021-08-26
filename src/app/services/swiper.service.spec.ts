import { TestBed } from '@angular/core/testing';

import { SwiperService } from './swiper.service';

describe('SwiperService', () => {
  let service: SwiperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwiperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
