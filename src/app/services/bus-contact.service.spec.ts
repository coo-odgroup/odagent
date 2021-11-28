import { TestBed } from '@angular/core/testing';

import { BusContactService } from './bus-contact.service';

describe('BusContactService', () => {
  let service: BusContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
