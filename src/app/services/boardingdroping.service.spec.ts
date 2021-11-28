import { TestBed } from '@angular/core/testing';

import { BoardingdropingService } from './boardingdroping.service';

describe('BoardingdropingService', () => {
  let service: BoardingdropingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardingdropingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
