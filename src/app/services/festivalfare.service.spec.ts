import { TestBed } from '@angular/core/testing';

import { FestivalfareService } from './festivalfare.service';

describe('FestivalfareService', () => {
  let service: FestivalfareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FestivalfareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
