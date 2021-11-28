import { TestBed } from '@angular/core/testing';

import { BuscancellationService } from './buscancellation.service';

describe('BuscancellationService', () => {
  let service: BuscancellationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscancellationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
