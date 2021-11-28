import { TestBed } from '@angular/core/testing';

import { SeatopenService } from './seatopen.service';

describe('SeatopenService', () => {
  let service: SeatopenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatopenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
