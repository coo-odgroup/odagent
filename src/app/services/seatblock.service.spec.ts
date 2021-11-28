import { TestBed } from '@angular/core/testing';

import { SeatblockService } from './seatblock.service';

describe('SeatblockService', () => {
  let service: SeatblockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatblockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
