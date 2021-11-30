import { TestBed } from '@angular/core/testing';

import { GetSeatPriceService } from './get-seat-price.service';

describe('GetSeatPriceService', () => {
  let service: GetSeatPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSeatPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
