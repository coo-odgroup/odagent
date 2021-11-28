import { TestBed } from '@angular/core/testing';

import { UserreviewService } from './userreview.service';

describe('UserreviewService', () => {
  let service: UserreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
