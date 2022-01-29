import { TestBed } from '@angular/core/testing';

import { ManagebookingService } from './managebooking.service';

describe('ManagebookingService', () => {
  let service: ManagebookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagebookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
