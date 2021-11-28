import { TestBed } from '@angular/core/testing';

import { OwnerpaymentService } from './ownerpayment.service';

describe('OwnerpaymentService', () => {
  let service: OwnerpaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerpaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
