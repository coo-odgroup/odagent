import { TestBed } from '@angular/core/testing';

import { ContactreportService } from './contactreport.service';

describe('ContactreportService', () => {
  let service: ContactreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
