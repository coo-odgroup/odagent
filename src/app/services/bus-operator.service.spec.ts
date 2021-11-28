import { TestBed } from '@angular/core/testing';

import { BusOperatorService } from './bus-operator.service';

describe('BusOperatorService', () => {
  let service: BusOperatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusOperatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
