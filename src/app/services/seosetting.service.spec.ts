import { TestBed } from '@angular/core/testing';

import { SeosettingService } from './seosetting.service';

describe('SeosettingService', () => {
  let service: SeosettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeosettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
