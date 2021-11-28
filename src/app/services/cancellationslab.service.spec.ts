import { TestBed } from '@angular/core/testing';

import { CancellationslabService } from './cancellationslab.service';

describe('CancellationslabService', () => {
  let service: CancellationslabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancellationslabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
