import { TestBed } from '@angular/core/testing';

import { BoardingDropingPointService } from './boarding-droping-point.service';

describe('BoardingDropingPointService', () => {
  let service: BoardingDropingPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardingDropingPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
