import { TestBed } from '@angular/core/testing';

import { BusgalleryService } from './busgallery.service';

describe('BusgalleryService', () => {
  let service: BusgalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusgalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
