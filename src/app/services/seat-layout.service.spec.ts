import { TestBed } from '@angular/core/testing';

import { SeatLayoutService } from './seat-layout.service';

describe('SeatLayoutService', () => {
  let service: SeatLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
