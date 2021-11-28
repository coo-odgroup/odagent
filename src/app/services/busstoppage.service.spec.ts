import { TestBed } from '@angular/core/testing';

import { BusstoppageService } from './busstoppage.service';

describe('BusstoppageService', () => {
  let service: BusstoppageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusstoppageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
