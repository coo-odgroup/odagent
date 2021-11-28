import { TestBed } from '@angular/core/testing';

import { SpecialsliderService } from './specialslider.service';

describe('SpecialsliderService', () => {
  let service: SpecialsliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialsliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
