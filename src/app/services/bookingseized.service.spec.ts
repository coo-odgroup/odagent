import { TestBed } from '@angular/core/testing';

import { BookingseizedService } from './bookingseized.service';

describe('BookingseizedService', () => {
  let service: BookingseizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingseizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
