import { TestBed } from '@angular/core/testing';

import { WalletbalanceService } from './walletbalance.service';

describe('WalletbalanceService', () => {
  let service: WalletbalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletbalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
