import { TestBed } from '@angular/core/testing';

import { PagecontentService } from './pagecontent.service';

describe('PagecontentService', () => {
  let service: PagecontentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagecontentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
