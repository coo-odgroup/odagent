import { TestBed } from '@angular/core/testing';

import { BusSeatsService } from './bus-seats.service';

describe('BusSeatsService', () => {
  let service: BusSeatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusSeatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
