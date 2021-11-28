import { TestBed } from '@angular/core/testing';

import { BusSequenceService } from './bus-sequence.service';

describe('BusSequenceService', () => {
  let service: BusSequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusSequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
