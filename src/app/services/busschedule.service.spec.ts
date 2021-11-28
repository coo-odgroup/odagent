import { TestBed } from '@angular/core/testing';

import { BusscheduleService } from './busschedule.service';

describe('BusscheduleService', () => {
  let service: BusscheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusscheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
