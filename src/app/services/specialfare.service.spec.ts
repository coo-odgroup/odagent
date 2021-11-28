import { TestBed } from '@angular/core/testing';

import { SpecialfareService } from './specialfare.service';

describe('SpecialfareService', () => {
  let service: SpecialfareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialfareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
