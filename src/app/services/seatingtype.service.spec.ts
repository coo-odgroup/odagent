import { TestBed } from '@angular/core/testing';

import { SeatingtypeService } from './seatingtype.service';

describe('SeatingtypeService', () => {
  let service: SeatingtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatingtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
